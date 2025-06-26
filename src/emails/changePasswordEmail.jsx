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

export const ChangePasswordEmail = ({ userName, token }) => {
    const verifyUrl = `${process.env.NEXTAUTH_URL}/change-password?token=${token}`;
    return (
        <Html lang="en">
            <Head />
            <Body style={main}>
                <Preview>Pettie - Request to change password</Preview>
                <Container style={container}>
                    <Heading as="h1">Pettie</Heading>
                    <Section>
                        <Text style={text}>Hi {userName},</Text>
                        <Text style={text}>
                            It looks like you want to change your password.{" "}
                            <br /> You can set a new password here:
                        </Text>
                        <Button style={button} href={verifyUrl}>
                            Reset password
                        </Button>
                        <Text style={text}>
                            The link will only be active for 30 minutes.
                        </Text>
                        <Text style={text}>
                            If you don't want to change your password or didn't
                            request this, just ignore and delete this message.
                        </Text>
                        <Text style={text}>
                            Do not forward this email to anyone for security
                            reasons!
                        </Text>
                        <Text style={text}>Thank you for your trust!</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default ChangePasswordEmail;

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
