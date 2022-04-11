import {
  Row,
  Col,
  Input,
  Form,
  Image,
  Space,
  Typography,
  Button,
  message,
} from "antd";
import { LockOutlined } from "@ant-design/icons";
import logo from "../../assets/img/logo_full.png";
import { useAuth } from "../../context/amplify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const FirstLoginConfirm = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { Text } = Typography;
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const submitConfirm = () => {
    if (password !== passwordConfirm) {
      return message.error("As senhas devem ser iguais.");
    }

    auth
      .completePassword(password)
      .then((res) => {
        navigate("/", { replace: true });
        localStorage.clear();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Row
        align="middle"
        justify="center"
        style={{ minHeight: "100vh", background: "#ebedef" }}
      >
        <Col
          xs={12}
          lg={12}
          xl={8}
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
          <Space direction="vertical" align="center" size="middle">
            <Image preview={false} src={logo}></Image>
          </Space>
          <Row style={{ marginBottom: "2em" }}>
            <Col>
              <Text>
                Olá! Detectamos que esse é seu primeiro login e para acessar a
                plataforma você precisa alterar a sua senha temporária! Sua
                senha precisa ter: <br />
                <br />
                No mínimo 6 caracteres <br />
                <br />1 número <br />
                <br />1 letra minúscula <br />
                <br />1 letra maiúscula
              </Text>
            </Col>
          </Row>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
          >
            <Form.Item>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                addonBefore={<LockOutlined />}
                placeholder="Nova senha"
              />
            </Form.Item>

            <Form.Item>
              <Input.Password
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                addonBefore={<LockOutlined />}
                placeholder="Confirmar senha"
              />
            </Form.Item>

            <Form.Item>
              <Row align="end">
                <Button type="primary" onClick={() => submitConfirm()}>
                  Enviar
                </Button>
              </Row>
            </Form.Item>
          </Form>
          <Row>
            <Col align="middle">
              <a href="/">Voltar</a>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
