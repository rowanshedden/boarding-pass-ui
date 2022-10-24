import './App.css';
import TravelerForm from './UI/TravelerForm';
import styled from 'styled-components'

import logo from './assets/airline-logo.png'
import language from './assets/language.svg'
import poweredByLogo from './assets/powered-by.png'

import {
  Logo,
  Language,
  Btn,
  PoweredByLogo,
} from './UI/CommonStylesForms'

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`
const Main = styled.main`
  flex: 9;
  padding: 0;
`

 const ContactBtn = styled.div`
  float: right;
  margin-top: 11px;
`
function App() {
  return (
    
    <Frame id="app-frame">
        <Main>
        <div className='header'>
            <Logo src={logo} alt="Logo" />
            <ContactBtn><Btn>Contact Us</Btn></ContactBtn>
        </div>
            <TravelerForm />
            <div className='footer'>
          <div className='one-third-column'>
            <Language src={language} alt="Language" /> English
          </div>
          <div className='one-third-column'>
            <div className='text-center'>
            Copyright © SITA. All rights reservered.
            </div>
          </div>
          <div className='one-third-column'>
          <PoweredByLogo src={poweredByLogo} alt="poweredByLogo" />
          </div>
      </div>   
        </Main>
    </Frame>
  );
}

export default App;
