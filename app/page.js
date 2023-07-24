import { AiFillCalendar, AiFillTool } from "react-icons/ai";
import { PiListChecks } from "react-icons/pi";
import Link from "next/link";

function ToolLinkButton({ icon, text, link }) {
    return (
        <Link
            className="group grid grid-cols-1 place-items-center justify-center bg-primary rounded-lg p-4 m-4"
            href={link ? link : "/"}
        >
            <div className="text-6xl transition-all ease-linear group-hover:text-highlight">{icon ? icon : <AiFillTool />}</div>
            <p className="text-lg transition-all ease-linear group-hover:text-highlight">{text ? text : "tool name"}</p>
        </Link>
    );
}

export default function Home() {
    return (
        <main>
            <p className="text-4xl transition-all ease-linear text-shadow-sm hover:text-shadow-lg shadow-highlight">
                This is <b>REMKSTATION</b>, a remote workstation web
                application.
            </p>
            <p className="text-right text-xl py-4">Work in progress.</p>
            <div className="bg-primary rounded-xl p-5">
                <p className="text-2xl italic p-2 pb-5">Available utilities</p>
                <div className="flex justify-center border-4 rounded-lg border-white">
                    <ToolLinkButton
                        icon={<PiListChecks />}
                        text={"To Do List"}
                        link={"/todo"}
                    />
                    <ToolLinkButton
                        icon={<AiFillCalendar />}
                        text={"Calendar"}
                        link={"/calendar"}
                    />
                </div>
            </div>
            <p className="p-8 text-center text-lg">All user data is stored locally in your browser.</p>
        </main>
    );
}
