import Link from "next/link";

type AlternateHeaderProps = {
    displayMessage: string;
};

export default function AlternateHeader({ displayMessage }: AlternateHeaderProps) {
    return (
        <div className="alternate-header">
            <Link href="/">

                <img src="/favicon.ico" />

            </Link>
            <span className="alternate-header-label">{displayMessage}</span>
        </div>
    );
}
