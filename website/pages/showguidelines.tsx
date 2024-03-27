import Link from "next/link";

import HeadMetadata from "@/components/HeadMetadata";

export default function ShowGuidelines() {
    return (
        <div className="show-guidelines-wrapper">
            <HeadMetadata title="Show Guidelines | zkNews" />
            <div className="show-guidelines-top-image">
                <Link href="/">

                    <img src="/favicon.png" />

                </Link>
                <h1>zkNews</h1>
            </div>
            <div className="show-guidelines-text-container">
                <p className="show-guidelines-text-title top">Show CN</p>
                <p>Show CN is a way to share something that you’ve made on zkNews.</p>
                <p>
                    Show CNs can be found via{" "}
                    <Link href="/show">
                        show
                    </Link>{" "}
                    in the top bar, and the newest ones are{" "}
                    <Link href="/shownew">
                        here
                    </Link>
                    . To post one yourself, simply{" "}
                    <Link href="/submit">
                        submit
                    </Link>{" "}
                    a story whose title begins with "Show CN".
                </p>
                <p className="show-guidelines-text-title">What to Submit</p>
                <p>
                    Show CN is for something you’ve made that other people can play with. CN users can try it out, give
                    you feedback, and ask questions in the thread.
                </p>
                <p>
                    A Show CN needn’t be complicated or look slick. The community is comfortable with work that’s at an
                    early stage.
                </p>
                <p>
                    If your work isn’t ready for people to try out yet, please don’t do a Show CN. Once it’s ready, come
                    back and do it then.
                </p>
                <p>Blog posts, sign-up pages, and fundraisers can’t be tried out, so they can’t be Show CNs.</p>
                <p>
                    New features and upgrades ("Foo 1.3.1 is out") generally aren’t substantive enough to be Show CNs. A
                    major overhaul is probably ok.
                </p>
                <p className="show-guidelines-text-title">In Comments</p>
                <p>Be respectful. Anyone sharing work is making a contribution, however modest.</p>
                <p>Ask questions out of curiosity. Don’t cross-examine.</p>
                <p>
                    Instead of "you're doing it wrong", suggest alternatives. When someone is learning, help them learn
                    more.
                </p>
                <p>When something isn’t good, you needn’t pretend that it is. But don’t be gratuitously negative.</p>
                <div className="show-guidelines-bottom-divider"></div>
            </div>
        </div>
    );
}
