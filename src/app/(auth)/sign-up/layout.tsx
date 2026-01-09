interface SignInLayoutProps {
    children: React.ReactNode;
}

const SignUpLayout = ({ children }: SignInLayoutProps) => {
    return (
        <div>
            {children}
        </div>
    );
}

export default SignUpLayout;