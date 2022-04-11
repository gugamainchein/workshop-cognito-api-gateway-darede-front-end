import { Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const Loading = () => {
  return (
    <Row style={{ height: "100vh" }} align="middle">
      <Col align="middle" span={24}>
        <LoadingOutlined width={80} />
      </Col>
    </Row>
  );
};
