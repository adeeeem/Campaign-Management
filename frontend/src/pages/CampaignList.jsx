import { useEffect, useState } from "react";
import { fetchCampaigns } from "../api";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from "reactstrap";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await fetchCampaigns();
        setCampaigns(data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      }
    };
    getData();
  }, []);

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Card style={{ width: "600px" }}>
        <CardBody>
          <Row className="mb-3">
            <Col>
              <CardTitle tag="h3">My Campaigns</CardTitle>
            </Col>
            <Col className="text-end">
              <Button color="primary" onClick={() => navigate("/campaigns/new")}>
                + New Campaign
              </Button>
            </Col>
          </Row>

          {campaigns.length === 0 ? (
            <p className="text-center text-muted">No campaigns found.</p>
          ) : (
            <ListGroup>
              {campaigns.map((c) => (
                <ListGroupItem key={c.id}>
                  <strong>{c.name}</strong> – {c.objective}
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </CardBody>
      </Card>
    </Container>
  );
}
