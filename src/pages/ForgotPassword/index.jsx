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
import { UserOutlined } from "@ant-design/icons";
import logo from "../../assets/img/logo_full.png";
import { useAuth } from "../../context/amplify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const submitReset = () => {
    setLoading(true);
    auth
      .sendPasswordResetEmail(userEmail)
      .then((res) => {
        localStorage.setItem("email", userEmail);
        setLoading(false);
        message.success("Email com código para recuperar senha enviado!");
        navigate("/verificarcodigo", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        message.error("Erro ao enviar email. Revise seu email");
      });
  };

  useEffect(() => {
    const listener = async (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        await submitReset();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [userEmail]);

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
            <Form.Item
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                addonBefore={<UserOutlined />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item>
              <Row align="end">
                <Button
                  type="primary"
                  loading={loading}
                  onClick={() => submitReset()}
                >
                  Enviar e-mail
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
