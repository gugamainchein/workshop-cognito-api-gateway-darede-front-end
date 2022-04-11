import {
  Row,
  Col,
  Input,
  Form,
  Image,
  Space,
  Divider,
  Button,
  message,
} from "antd";
import { LockOutlined } from "@ant-design/icons";
import logo from "../../assets/img/logo_full.png";
import { useAuth } from "../../context/amplify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CodeVerification = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const submitReset = () => {
    setLoading(true);
    auth
      .recoveryNewPassword(localStorage.getItem("email"), code, password)
      .then((res) => {
        message.success("Senha alterada com sucesso!");
        navigate("/", { replace: true });
        localStorage.clear();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        message.error("Erro ao tentar trocar a senha.");
        setLoading(false);
      });
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
          <Space direction="vertical" align="center" size="middle">
            <Image preview={false} src={logo}></Image>
            <Divider>Recupere sua senha</Divider>
          </Space>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
          >
            <Form.Item>
              <Input
                type="number"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Código recebido no email"
              />
            </Form.Item>

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
                <Button
                  type="primary"
                  loading={loading}
                  onClick={() => submitReset()}
                >
                  Enviar
                </Button>
              </Row>
            </Form.Item>
          </Form>
          <Row>
            <Col align="middle">
              <a href="/recuperar-senha">Voltar</a>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
