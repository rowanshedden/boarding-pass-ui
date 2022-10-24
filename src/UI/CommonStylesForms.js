import styled from 'styled-components'

export const InputBox = styled.div`
  margin: 7px;
  display: flex;
  justify-content: center;
`

export const Modal = styled.div`
  overflow: hidden;
  margin: auto;
  padding: 10px;
  max-height: 90vh;
  width: 70%;
  font-size: 12px;
  border: 1px solid #d7d7d7;
  background: white;
`

export const ModalLabel = styled.label`
  color: ${(props) => props.theme.text_color};
  font-size: 16px;
  width: 40%;
  margin-right: 20px;
  text-align: right;
  line-height: 28px;
`

export const InputFieldModal = styled.input`
  color: ${(props) => props.theme.text_color};
  font-size: 16px;
  width: 40%;
  padding: 4px;
  }
`

export const ModalContent = styled.div`
  height: 99%;
  width: 100%;
  padding: 10px 5px;
  overflow-y: auto;
  text-align: center;
  font-size: 24px;
`

export const Label = styled.label`
  margin-right: 180px;
  width: 10%;
  font-size: 16px;
  text-align: left;
  color: ${(props) => props.theme.text_color};
`

export const DataValue = styled.span`
  line-height: 28px;
  font-size: 16px;
  width: 40%;
  text-align: left;
`

// Full-screen forms
export const FormContainer = styled.div`
  margin: auto;
  min-width: 400px;
  width: 100%;
  text-align: center;
  background: ${(props) => props.theme.background_primary};
  background-color: white;
  margin-bottom: 30px;
`
export const SubmitBtn = styled.button`
  margin: 10px 0px 0px 40px;
  padding: 10px 20px;
  font-size: 1.3em;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 15px;
  color: white;
  border: none;
  box-shadow: ${(props) => props.theme.drop_shadow};
  background: #B7142C;
  :hover {
    cursor: pointer;
  }
`
export const Btn = styled.button`
  padding: 10px 20px;
  font-size: 0.7em;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 15px;
  color: white;
  border: none;
  box-shadow: ${(props) => props.theme.drop_shadow};
  background: #B7142C;
  :hover {
    cursor: pointer;
  }
`

export const BtnLarge = styled.button`
display: inline;
padding: 10px 20px;
font-size: 1.3em;
font-weight: bold;
text-transform: uppercase;
border-radius: 10000px;
color: white;
border: none;
box-shadow: ${(props) => props.theme.drop_shadow};
background: #B7142C;
:hover {
  cursor: pointer;
}
`
export const LogoHolder = styled.div`
  padding: 20px 0 10px 0;
  margin-bottom: 20px;
  width: 100%;
  margin: 10px;
`
export const Logo = styled.img`
  width: 100px;
`
export const PoweredByLogo = styled.img`
  position: absolute;
  width: 150px;
  right: 25px;
  top: -40px;
`
export const Bubble = styled.img`
  position: absolute;
  vertical-align: top;
  animation: rotate infinite 10s;
  right: 40px;
  top: -50px;
  z-index: 100;
  @keyframes rotate{
    0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}
    to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}
  }
`
export const Language = styled.img`
  width: 20px;
  vertical-align: middle;
`
export const Form = styled.form`
`

     