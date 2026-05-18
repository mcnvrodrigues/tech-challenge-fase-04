import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination: "/transacoes",
            permanent: false,
        },
    };
};

export default function TransactionsRedirect() {
    return null;
}