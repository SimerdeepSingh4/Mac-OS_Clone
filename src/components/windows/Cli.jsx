import React from "react";
import MacWindow from "./MacWindow";
import Terminal from "react-console-emulator";
import "./cli.scss";



const Cli = ({ windowName, setWindowState, windowProps }) => {

    const commands = {
        whoami: {
            description: "Who am I?",
            fn: () => `
------------------------------------
            Simerdeep Singh — Full Stack Developer
------------------------------------
            `,
        },

        about: {
            description: "About me",
            fn: () =>
                `
------------------------------------
                I’m a Full Stack Developer focused on React, backend APIs, and building real-world products instead of tutorial junk.
------------------------------------
                `,
        },

        skills: {
            description: "List technical skills",
            fn: () => `
------------------------------------
Frontend : React, JavaScript, HTML, CSS
Backend  : Node.js, Express, MongoDB
Other    : Git, REST APIs
------------------------------------
      `,
        },
        stack: {
            description: "Frontend stack used in this system",
            fn: () => `
------------------------------------
Framework : React
Build Tool: Vite
Styling   : SCSS (modular & animated UI)
UI Logic  : Custom window manager + state context
UX Focus  : Desktop-first interactions & performance
------------------------------------
  `,
        },

        projects: {
            description: "Highlighted projects",
            fn: () => `
------------------------------------
• macOS Web Clone — Desktop UI, window manager, dock
• Mentora — LMS for students & instructors
• MCP Tool — Terminal-based AI automation
• Real-Time Chess — Multiplayer with Socket.IO
Type "project <name>" for details
------------------------------------
  `,
        },

        contact: {
            description: "How to contact me directly",
            fn: () => `
------------------------------------
Email : simerdeepsingh567@gmail.com
Phone : +91-7455897944
Location : India
------------------------------------
  `,
        },

        os: {
            description: "About this environment",
            fn: () => `
------------------------------------
macOS Web Clone
Built with React + Vite
Desktop-first experience
Running inside a browser
------------------------------------

  `,
        },
        neofetch: {
            description: "Display system information",
            fn: () => `
------------------------------------
OS: macOS Web Clone
Host: Browser Environment
Shell: react-console-emulator
Frontend: React + Vite
Developer: Simerdeep Singh
------------------------------------

  `,
        },


        time: {
            description: `Show current time`,
            fn: () => `
------------------------------------
            ${new Date().toLocaleString()}
------------------------------------
            `,
        },
        roadmap: {
            description: "Planned enhancements for this macOS environment",
            fn: () => `
------------------------------------
• AI-assisted terminal commands inside the OS
• Spotlight search with natural language input
• Smarter window snapping & focus management
• App-level state persistence across sessions
• Performance optimization for multi-window usage
------------------------------------

  `,
        },

        social: {
            description: "Social links",
            fn: () => `
------------------------------------
GitHub  : https://github.com/SimerdeepSingh4
LinkedIn : https://www.linkedin.com/in/simerdeep-singh-gandhi/
------------------------------------
      `,
        },
    };


    return (
        <MacWindow windowName={windowName} setWindowState={setWindowState}>
            <div className="cli-window">
                <Terminal
                    commands={commands}
                    welcomeMessage={<span style={{ color: "#ffffff" }}>
      👋 Welcome, I'm Simerdeep
      <br />
      macOS-style portfolio terminal
      <br />
      Type "help" to explore commands.
    </span>}
                    promptLabel={"simerdeepsingh:~$"}
                    promptLabelStyle={{ color: "#00ff00" }}
                    contentStyle={{ color: "#9d7f5a" }}
                />
            </div>
        </MacWindow>
    );
};

export default Cli;
