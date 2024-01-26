import Head from "next/head";

export default function HeadMetadata({ description, title }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            {/* TODO(TK 2024-01-26): bug: icon in tab reverts when uncommented, leave commented for now */}
            {/* <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" /> 
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="var(--c-darkest)" />
            <meta name="theme-color" content="var(--c-darkest)" />
        </Head>
    );
}
