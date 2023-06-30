import Link from "next/link";

function NavButton({children, text, link}) {
    return (
        <Link className="inline-block mx-2 text-2xl text-tcolor transition-colors ease-linear hover:text-highlight" href={link ? link : "/"}>
            {children}
            <p className="">
                {text ? text : ""}
            </p>
        </Link>
    )
} 

export default function TopNavBar() {
    return (
        <div className="bg-primary p-3 shadow-highlight_darker shadow-md">
            <NavButton text="REMKSTATION"/>
            <NavButton text="To Do" link="/todo"/>
        </div>
    );
}