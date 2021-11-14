import React from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import LoginForms from '../components/LoginForms';
import RegisterForms from '../components/RegisterForms';

function InitialPage() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100 vw-100 p-0"
    >
      <Container className="w-50 h-100 bg-darkred d-flex justify-content-center align-items-center">
        <h1 class="text-success text-center bg-white p-5 rounded-circle">Cook Master</h1>
      </ Container>
      <Container
        className="d-flex justify-content-center align-items-center w-50 h-100 bg-light"
      >
        <div
          className="border border-1 border-light rounded p-3
          d-flex-column justify-content-center align-items-center bg-darkred text-white"
        >
          <Tabs
            defaultActiveKey="login"
            id="uncontrolled-tab-example"
            className="mb-3 d-flex"
          >
            <Tab
              eventKey="login"
              title="Login"
              className="height-300"
            >
              <LoginForms />
            </Tab>
            <Tab eventKey="register" title="Register" className="height-400">
              <RegisterForms />
            </Tab>
          </Tabs>
        </div>
      </Container>
    </Container>
  );
}

export default InitialPage;
