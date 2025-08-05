import styled from 'styled-components'


export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10%;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 3% 0;
  width: 100%;
  max-width: 500px;
  height: 600px;
  border: 1px solid #b9afaf;
  border-radius: 10px;
  box-shadow: 0 4px 4px 5px #b9afaf;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const IconSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background-color: #f9be08;
  opacity: 0.6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
`

export const Title = styled.div`
  margin: 20px;
  font-size: 26px;
  font-weight: bold;
`

export const Description = styled.div`
  margin: 10px;
  font-size: 16px;
  text-align: center;
  line-height: 2;
  color: #555;
`

export const Button = styled.button`
  width: 200px;
  height: 40px;
  font-size: 18px;
  margin-top: 40px;
  border: none;
  border-radius: 20px;
  background-color: #f9be08;
  
  &:hover {
    background-color: #d9d9d9;
    cursor: pointer;
  }
  
  span {
    font-weight: bold;
  }
  
  
`