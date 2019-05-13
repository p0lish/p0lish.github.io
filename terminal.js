(() => {
  // initial configuration

  terminalelem = document.querySelector("#input");
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
  _render = () =>
    (terminalelem.innerHTML = _pastbuff + _ibuff.join("") + cursor);

  _newline = () => (_pastbuff += _ibuff.join("").concat(linebreak, _prompt));
  _newlines = () => (_pastbuff += _ibuff.join("").concat(linebreaks, _prompt));
  _print = buff => {
    readonly = true;
    _pastbuff += _ibuff.join("").concat(linebreak);
    let i = 0;
    const timer = setInterval(() => {
      if (i > buff.length - 1) {
        _newlines();
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
    _render();
    window.scrollTo(0, document.body.scrollHeight);
  };

  _initBanner = () => {
    _put(asciEngine.printText("terminal_-_x", 5));
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
        _newline();
        _render();
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
    ScrollLock: () => false
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
    document.querySelector("#inputText").focus();
    window.addEventListener("keydown", event => {
      if (!readonly) {
        if (Object.keys(_commands).includes(event.code)) {
          _commands[event.code](_ibuff.join(""));
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
