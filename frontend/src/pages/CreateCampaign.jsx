import { useState } from "react";
import { createCampaign, getAISuggestions } from "../api";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

export default function CreateCampaign() {
  const [form, setForm] = useState({
    name: "",
    objective: "Traffic",
    budget: "",
    targetAudience: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSuggest = async () => {
    try {
      const { data } = await getAISuggestions();
      setForm({ ...form, budget: data.budget, targetAudience: data.audience });
    } catch (err) {
      console.error("AI Suggestion error:", err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await createCampaign(form);
      navigate("/campaigns");
    } catch (err) {
      console.error("Campaign save error:", err);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "500px" }}>
        <CardBody>
          <CardTitle tag="h3" className="text-center mb-4">
            Create Campaign
          </CardTitle>

          <Form onSubmit={handleSave}>
            {/* Campaign Name */}
            <FormGroup>
              <Label for="name">Campaign Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter campaign name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            {/* Objective */}
            <FormGroup>
              <Label for="objective">Objective</Label>
              <Input
                type="select"
                id="objective"
                name="objective"
                value={form.objective}
                onChange={handleChange}
              >
                <option value="Traffic">Traffic</option>
                <option value="Conversions">Conversions</option>
              </Input>
            </FormGroup>

            {/* Budget */}
            <FormGroup>
              <Label for="budget">Budget</Label>
              <Input
                id="budget"
                name="budget"
                placeholder="Enter budget"
                value={form.budget}
                onChange={handleChange}
                required
              />
            </FormGroup>

            {/* Target Audience */}
            <FormGroup>
              <Label for="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                name="targetAudience"
                placeholder="Enter target audience"
                value={form.targetAudience}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <Row>
              <Col>
                <Button color="info" type="button" onClick={handleSuggest} block>
                  AI Suggest
                </Button>
              </Col>
              <Col>
                <Button color="primary" type="submit" block>
                  Save Campaign
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}
