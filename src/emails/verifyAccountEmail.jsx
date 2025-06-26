import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Heading,
    Preview,
    Section,
    Text,
} from "@react-email/components";

export const VerifyAcountEmail = ({ userName, token }) => {
    const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
    return (
        <Html lang="en">
            <Head />
            <Body style={main}>
                <Preview>Pettie - Verify your account!</Preview>
                <Container style={container}>
                    <Heading as="h1">Pettie</Heading>
                    <Section>
                        <Text style={text}>Hi {userName},</Text>
                        <Text style={text}>
                            You are still a few clicks away from your account!{" "}
                            <br />
                            To complete your registration, click the button
                            below:
                        </Text>
                        <Button style={button} href={verifyUrl}>
                            Verify
                        </Button>
                        <Text style={text}>
                            If you're not the one trying to register, just
                            ignore and delete this message.
                        </Text>
                        <Text style={text}>Thank you for your trust!</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default VerifyAcountEmail;

const main = {
    backgroundColor: "#f6f9fc",
    padding: "10px 0",
};

const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #f0f0f0",
    padding: "45px",
};

const text = {
    fontSize: "16px",
    fontFamily:
        "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: "300",
    color: "#404040",
    lineHeight: "26px",
};

const button = {
    backgroundColor: "#46a56c",
    borderRadius: "4px",
    color: "#fff",
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    width: "210px",
    padding: "14px 7px",
};
