// terminal command router
// terminal command functions
_clear = () => {
  displayelem.innerHTML = "";
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
    "play                   RetroWave animation with sound"
    "night                  Css only animation"
    "turbine                Yet another css only animation"
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
      Creativity             NPM
      Javascript             Node.js
      CSS                    Linux
      Python                 Vue
      UX/UI                  React
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
  _print(about_);
};

_skills = () => {
  _print(skills_);
};

_play = () => {
  window.open("/nrw.html");
};
_night = () => {
  window.open("/night");
}
_turbine = () => {
  window.open("/wind-turbine");
}
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
    _print(contact_);
  }
};

_terminalfunctions = {
  clear: _clear,
  cls: _clear,
  date: _date,
  help: _help,
  contact: _contact,
  about: _about,
  skills: _skills,
  play: _play,
  night: _night
};

(() => {
  // initial configuration

  displayelem = document.querySelector("#display");
  clielem = document.querySelector("#input");
  _prompt = "<b class='prompt'>p0lish:~$ </b> "; // type of the prompt
  cursor = "<span class='cursor'>█</span>"; // cursor element
  unknowncommand = "Unknown command";
  linebreak = "<br />";
  linebreaks = "<br /><br />";

  _pastbuff = "";
  _ibuff = [];
  _cursorSpeed = 10;
  readonly = false;

  // render buffer contents to the display
  _render = () => (clielem.innerHTML = _pastbuff + _ibuff.join("") + cursor);
  _freeze = () => {
    displayelem.innerHTML += _pastbuff + linebreak;
    _pastbuff = "";
    _ibuff = [];
  };
  _nbspline = () => (_pastbuff += _ibuff.join("").concat(_prompt));
  _newline = () => (_pastbuff += _ibuff.join("").concat(linebreak, _prompt));
  _newlines = () => (_pastbuff += _ibuff.join("").concat(linebreaks, _prompt));

  _print = buff => {
    readonly = true;
    _pastbuff += _ibuff.join("").concat(linebreak);
    let i = 0;
    const timer = setInterval(() => {
      if (i > buff.length - 1) {
        _freeze();
        _nbspline();
        clearInterval(timer);
        readonly = false;
      } else {
        _pastbuff += buff[i];
      }
      _render();
      window.scrollTo(0, document.body.scrollHeight);
      i++;
    }, _cursorSpeed);
  };

  _put = buff => {
    _pastbuff += linebreak;
    _pastbuff += buff;
    _ibuff = [];
    _freeze();
    window.scrollTo(0, document.body.scrollHeight);
  };

  _initBanner = () => {
    _print(`<pre>
    type 'help' for more information
    </pre>`);
  };

  // command router

  _commands = {
    Backspace: () => {
      _ibuff = _ibuff.splice(0, _ibuff.length - 1);
    },
    Enter: () => {
      const input = _ibuff.join("").split("&nbsp;")[0];
      const param = _ibuff.join("").split("&nbsp;")[1];
      if (Object.keys(_terminalfunctions).includes(input)) {
        _terminalfunctions[input](param);
      } else if (_ibuff.length < 1) {
        _freeze();
        _nbspline();
      } else {
        _pastbuff += _ibuff
          .join("")
          .concat(
            linebreak,
            unknowncommand,
            " '",
            _ibuff.join(""),
            "'",
            linebreaks,
            _prompt
          );
      }
      _ibuff = [];
      window.scrollTo(0, document.body.scrollHeight);
    },
    AltLeft: () => false,
    AltRight: () => false,
    ShiftLeft: () => false,
    ShiftRight: () => false,
    ControlLeft: () => false,
    ControlRight: () => false,
    ArrowUp: () => false,
    ArrowDown: () => false,
    ArrowLeft: () => false,
    ArrowRight: () => false,
    F1: () => false,
    F2: () => false,
    F3: () => false,
    F4: () => false,
    F5: () => false,
    F6: () => false,
    F7: () => false,
    F8: () => false,
    F9: () => false,
    F10: () => false,
    F11: () => false,
    F12: () => false,
    Escape: () => false,
    Insert: () => false,
    Delete: () => false,
    Home: () => false,
    End: () => false,
    PageUp: () => false,
    PageDown: () => false,
    CapsLock: () => false,
    Tab: () => false,
    MetaLeft: () => false,
    MetaRight: () => false,
    Pause: () => false,
    ScrollLock: () => false,
    Meta: () => false,
  };

  _preFormatChar = char => {
    const charMap = {
      "<": "&lt;",
      ">": "&gt;",
      " ": "&nbsp;"
    };
    _lastchar = char;
    return charMap[char] || char;
  };

  //  terminal initialzer

  init = () => {
    _initBanner();
    window.addEventListener("keydown", event => {
      if (!readonly) {
        code = event.code || event.which;
        if (Object.keys(_commands).includes(code)) {
          _commands[code](_ibuff.join(""));
        } else {
          _ibuff.push(_preFormatChar(event.key));
        }
        _render();
      }
    });
    _render();
    window.scrollTo(0, document.body.scrollHeight);
  };
  init();
})();
