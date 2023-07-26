import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

function NavButton({ children, text, link }) {
    return (
        <Link
            className="inline-block mx-2 text-2xl text-tcolor transition-colors ease-linear hover:text-highlight"
            href={link ? link : "/"}
        >
            {children}
            <p className="">{text ? text : ""}</p>
        </Link>
    );
}

export default function TopNavBar() {
    return (
        <div
            className="bg-primary p-3 shadow-highlight_darker shadow-md
            sticky top-0 z-50"
        >
            <NavButton text="REMKSTATION" />
            <NavButton text="To Do" link="/todo" />
            <NavButton text="Calendar" link="/calendar" />
            <NavButton text="Notes" link="/notes" />
            <NavButton link="https://github.com/MichaelTheSynthCat/remkstation">
                <span className="pr-1">About</span>
                <AiFillGithub className="inline align-top text-3xl"/>
            </NavButton>
        </div>
    );
}
