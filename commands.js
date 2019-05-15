// terminal command router
// terminal command functions
_clear = () => {
  _pastbuff = _prompt;
  _ibuff = [];
};

_date = () => {
  _print(new Date().toISOString());
};
const help_ = `
    <pre>
    "help                   This command",
    "about                  Brief summary about myself"
    "skills                 Skillset, and what tools I use"
    "contact                How to contact to me",
    "contact &lt;key&gt;          Open page (example: 'email' or 'linkedin')",
    "clear                  Clears the screen",
      </pre>`;
const about_ = `
      <pre>
       Janos Lengyel, senior software engineer.
       Mainly working on frontend using [Angular], [Vue], [React]
       and javascript, css(3), html.
  
       Currently learning dart, react.
       Always eager to learn new technologies.
  
       <b>LEVEL:</b> 5+ years of experience
       
       <b>PERSONALITY:</b> quiet, curious, calm, analytical
       
       <b>SKILLS:</b> front-end, back-end, devops, ux/ui
       
       <b>INTERESTS:</b> programming, old games, podcasts, travel, reading, learning, cats
      </pre>`;
const skills_ = `
      <pre>
      Web applications       Angular 
      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░

      Creativity             NPM     
      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░
      
      Javascript             Node.js 
      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░ 
      
      CSS                    Linux   
      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░
      
      Python                 Vue     
      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░   ▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░ 
      
      UX/UI                  React   
      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░   ▓▓▓▓▓▓▓░░░░░░░░░░░░░
      </pre>`;
const contact_ = `
      <pre>
      "[email]:        <a href="mailto:janos.lengyel@protonmail.ch">janos.lengyel@protonmail.ch"</a>
      
      "[linkedin]:     <a href='https://www.linkedin.com/in/janoslengyel/' target=_blank>janoslengyel</a>",
  
      "[soundcloud]:   <a href="https://soundcloud.com/p0lish" target=_blank>p0lish</a>",
      
      "[github]:       <a href="https://github.com/p0lish" target=_blank >https://github.com/p0lish</a>",
        </pre>`;
_help = () => {
  _print(help_);
};

_about = () => {
  _put(asciEngine.printText("about", 4));
  _print(about_);
};

_skills = () => {
  _put(asciEngine.printText("skills", 4));
  _print(skills_);
};

_exit = () => {
  window.open("", "_self").close();
};

_weather = () => {};

_contact = param => {
  const contacts = {
    email: "mailto:janos.lengyel@protonmail.ch",
    linkedin: "https://www.linkedin.com/in/janoslengyel/",
    soundcloud: "https://soundcloud.com/p0lish",
    github: "https://github.com/p0lish"
  };
  if (param && Object.keys(contacts).includes(param)) {
    window.open(contacts[param]);
  } else {
    _put(asciEngine.printText("contacts", 4));
    _print(contact_);
  }
};

_terminalfunctions = {
  clear: _clear,
  cls: _clear,
  date: _date,
  help: _help,
  exit: _exit,
  contact: _contact,
  about: _about,
  skills: _skills
};
