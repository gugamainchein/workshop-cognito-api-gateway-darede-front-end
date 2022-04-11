import { Row, Col, Typography, Button } from "antd";
import { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import { useAuth } from "../../context/amplify";

export const Home = () => {
  const auth = useAuth();
  const [dataAPI, setDataAPI] = useState("carregado...");

  const getAPI = async () => {
    const retAPI = await API.get(
      process.env.REACT_APP_AWS_API_GATEWAY_NAME,
      "/message"
    );

    setDataAPI(JSON.stringify(retAPI));
  };

  const putAPI = async () => {
    setDataAPI("carregando...");

    const retAPI = await API.put(
      process.env.REACT_APP_AWS_API_GATEWAY_NAME,
      "/message/Minerva",
      {}
    );

    setDataAPI(JSON.stringify(retAPI));
  };

  useEffect(() => {
    const rqt = async () => {
      await getAPI();
      return;
    };

    return rqt();
  }, []);

  return (
    <>
      <Row
        align="middle"
        justify="center"
        style={{ minHeight: "100vh", background: "#ebedef" }}
      >
        <Col
          xs={18}
          lg={12}
          xl={6}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "2em",
            borderRadius: "10px",
            border: "1px solid #c9c9c9",
            flexDirection: "column",
            backgroundColor: "#ffffff",
          }}
        >
          {/* <Space direction="vertical" align="center" size="middle"> */}
          <Row>
            <Col>
              <Typography.Title level={3}>Olá, time Minerva!</Typography.Title>
              <Typography.Text>
                O retorno deste workshop de Cognito + React JS é: {dataAPI}
              </Typography.Text>
            </Col>
          </Row>

          <Row
            direction="vertical"
            align="center"
            size="middle"
            style={{ marginTop: 10 }}
          >
            <Button onClick={() => putAPI()}>Atualizar Texto</Button>
            <Button style={{ marginLeft: 10 }} onClick={() => auth.signOut()}>
              Logout
            </Button>
          </Row>
        </Col>
      </Row>
    </>
  );
};
