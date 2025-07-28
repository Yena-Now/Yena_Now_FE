pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "yena_now_fe"
        DEPLOY_SERVER = "${DEPLOY_SERVER_USER}@${DEPLOY_SERVER_IP}"
        FE_ENV_FILE = "${FE_ENV_FILE}" // 예: /opt/env/fe.env
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo '0. 이전 빌드 내용 삭제'
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                echo '1. GitLab에서 소스 코드 가져오기'
                checkout scm
            }
        }

        stage('Prepare .env') {
            steps {
                echo '2. .env 파일 세팅'
                sh 'cp "$FE_ENV_FILE" .env'
            }
        }

        stage('Build React') {
            steps {
                echo '3. React 빌드'
                sh '''
                    yarn install --frozen-lockfile
                    yarn build
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '4. Docker 이미지 빌드'
                sh "docker build -t ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('Deploy to Production') {
            steps {
                echo '5. Docker로 직접 배포'
                script {
                    sh """
                        echo '도커 이미지 저장'
                        docker save -o fe-image.tar ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}

                        echo '이전 컨테이너 중지 및 삭제'
                        docker stop ${DOCKER_IMAGE_NAME} || true
                        docker rm ${DOCKER_IMAGE_NAME} || true

                        echo '도커 이미지 로드'
                        docker load -i fe-image.tar

                        echo '새 컨테이너 실행'
                        docker run -d --name ${DOCKER_IMAGE_NAME} \
                          -p 81:80 \
                          ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}

                        echo '임시 tar 파일 삭제'
                        rm -f fe-image.tar
                    """
                }
            }
        }
    }
}
