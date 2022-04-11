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
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../assets/img/logo_full.png";
import { useAuth } from "../../context/amplify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [password, setPassword] = useState();

  const submitLogin = async () => {
    setLoading(true);

    const login = await auth.signIn(userEmail, password);

    if (login !== undefined && login !== "No current user") {
      setLoading(false);
      return navigate("/home");

      // message.success("Logado com sucesso!");
    } else if (login === "No current user") {
      localStorage.setItem("email", userEmail);
      localStorage.setItem("password", password);
      navigate("/primeirologin", { replace: true });
      setLoading(false);
    } else {
      message.error("Erro ao tentar efetuar login. Revise seus dados");
      setLoading(false);
    }
  };

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
          <Space direction="vertical" align="center" size="middle">
            <Image preview={false} src={logo}></Image>
            <Divider>Faça login com seu email e senha</Divider>
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

            <Form.Item
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                addonBefore={<LockOutlined />}
                placeholder="Senha"
              />
            </Form.Item>

            <Form.Item>
              <Row align="end">
                <Button
                  onClick={async () => await submitLogin()}
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                >
                  Login
                </Button>
              </Row>
            </Form.Item>
          </Form>
          <Row>
            <Col align="middle">
              <a href="/recuperar-senha">Esqueceu sua senha?</a>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
