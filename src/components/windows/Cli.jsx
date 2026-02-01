import React from "react";
import MacWindow from "./MacWindow";
import Terminal from "react-console-emulator";
import "./cli.scss";



const Cli = ({windowName, setWindowState, windowProps}) => {

    const commands = {
        whoami: {
            description: "Who am I?",
            fn: () => "Simerdeep Singh — Full Stack Developer",
        },

        about: {
            description: "About me",
            fn: () =>
                "I’m a Full Stack Developer focused on React, backend APIs, and building real-world products instead of tutorial junk.",
        },

        skills: {
            description: "List technical skills",
            fn: () => `
Frontend : React, JavaScript, HTML, CSS
Backend  : Node.js, Express, MongoDB
Other    : Git, REST APIs, Linux basics
      `,
        },

        projects: {
            description: "Show projects",
            fn: () => `
• Mentora – LMS platform for students & instructors
• MCP Tool – AI-powered automation & social media posting
• Portfolio CLI – You’re using it right now 😉
      `,
        },

        contact: {
            description: "How to contact me directly",
            fn: () => `
Email : simerdeep@example.com
Phone : +91-XXXXXXXXXX
Location : India
  `,
        },


        time: {
            description: "Show current time",
            fn: () => new Date().toLocaleString(),
        },

        social: {
            description: "Social links",
            fn: () => `
GitHub  : github.com/yourusername
Twitter : x.com/yourusername
      `,
        },
    };


    return (
        <MacWindow windowName={windowName} setWindowState={setWindowState}>
            <div className="cli-window">
                <Terminal
                    commands={commands}
                    welcomeMessage={`👋 Welcome, I'm Simerdeep
                        This is a portfolio terminal.
                        Type "help" to explore.`}
                    promptLabel={"simerdeepsingh:~$"}
                    promptLabelStyle={{ color: "#00ff00" }}
                />
            </div>
        </MacWindow>
    );
};

export default Cli;
