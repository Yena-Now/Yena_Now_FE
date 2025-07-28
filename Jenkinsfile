pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "yena_now_fe"
        DEPLOY_SERVER = "ubuntu@i13e203.p.ssafy.io"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo '0. 이전 빌드 내용 삭제'
                deleteDir()  // 이전 빌드 산출물 및 작업공간 삭제
            }
        }

        stage('Checkout') {
            steps {
                echo '1. GitLab에서 소스 코드 가져오기'
                checkout scm
            }
        }

        stage('Build React') {
            steps {
                echo '2. React 빌드'
                sh '''
                    yarn install --frozen-lockfile
                    yarn build
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '3. Docker 이미지 빌드'
                sh "docker build -t ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'master'
            }
            steps {
                echo '4. master 브랜치 → 배포 시작'
                sshagent(credentials: ['server-ssh-key']) {
                    sh """
                        docker save -o fe-image.tar ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}
                        scp -o StrictHostKeyChecking=no fe-image.tar ${DEPLOY_SERVER}:/tmp/fe-image.tar
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_SERVER} '
                            docker load -i /tmp/fe-image.tar && \
                            docker stop ${DOCKER_IMAGE_NAME} || true && \
                            docker rm ${DOCKER_IMAGE_NAME} || true && \
                            docker run -d --name ${DOCKER_IMAGE_NAME} -p 81:80 \
                                ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}
                        '
                        rm -f fe-image.tar
                    """
                }
            }
        }
    }
}
