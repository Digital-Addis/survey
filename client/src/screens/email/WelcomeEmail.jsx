import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import DAImage from "../../assests/images/da.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaTelegramPlane,
} from "react-icons/fa";
export const WelcomEmail = () => (
  <Html>
    <Head />
    <Preview>You're now ready to make live survey with DA!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img src={DAImage} width="19%" height="2%" alt="Digital Addis" />
          <Hr style={hr} />
          <Text style={paragraph}>
            Thanks for submitting your account information. You're now ready to
            make live survey with DA!
          </Text>
          <Text style={paragraph}>
            You can view your surveys and a variety of other information about
            your account right from your dashboard.
          </Text>
          <Button style={button}>View your DA Dashboard</Button>
          <Hr style={hr} />

          <Text style={paragraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            iusto totam asperiores minima ab amet libero excepturi.
          </Text>
          <Text style={paragraph}>
            We'll be here to help you with any step along the way. You can find
            answers to most questions and get in touch with us on our support
            site.
          </Text>
          <Text style={paragraph}>— The DA team</Text>
          <Hr style={hr} />
          <Text style={footer}>DA, Addis Ababa, Ethiopia, Bole Japan</Text>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "30%",
              margin: "auto",
            }}
          >
            {" "}
            <FaInstagram style={{ fontSize: "21px" }} />
            <FaFacebookF style={{ fontSize: "21px" }} />
            <FaTelegramPlane style={{ fontSize: "21px" }} />
            <FaTwitter style={{ fontSize: "21px" }} />
          </div>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left",
};

const button = {
  backgroundColor: "#f05f25",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
