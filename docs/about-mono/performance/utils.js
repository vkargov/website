$.eachasync = function (iter, interval, fn) {
  var iteridx = 0;
  var iterlength = iter.length;

  if (iterlength === 0)
    return;

  (function iterfn () {
    fn (iter [iteridx], iteridx);

    if (++iteridx < iterlength)
      setTimeout (iterfn, interval);
  }) ();
};

function slugify (str) {
  return str.toLowerCase ().replace (/\ /g, '-').replace (/\//g, '-').replace (/\:/g, '-').replace (/\#/g, '').replace (/\&/g, '').replace (/\?/g, '');
}

function countersort (c1, c2) {
  if (c1 === "Time" && c2 === "Time") {
    return 0;
  } if (c1 === "Time") {
    return -1;
  } else if (c2 === "Time") {
    return 1;
  } else {
    if (c1 === c2) {
      return 0;
    } else {
      return c1 < c2 ? -1 : 1;
    }
  }
}

function githubCommitLink (commit) {
  // FIXME: return the URL to github
  return commit;
}

function drawLineChart (data, counter, elementid, options) {
  options = typeof options === 'object' ? options : {};

  var table = new google.visualization.DataTable();

  table.addColumn ('string');
  for (var config in data [counter])
    table.addColumn ('number', config);

  var column = 1;
  for (var config in data [counter]) {
    for (var row = 0, l = data [counter][config].length; row < l; row++) {
      if (column == 1) {
        table.addRow ();
        table.setCell (row, 0, data [counter][config][row]["Commit"], githubCommitLink (data [counter][config][row]["Commit"]));
      } else {
        if (table.getValue (row, 0) !== data [counter][config][row]["Commit"]) {
          error ("Revisions are not the same");
          return;
        }
      }

      table.setCell (row, column, data [counter][config][row]["Value"]);
    }

    column++;
  }

  var chartoptions = {
    vAxis: {
      minValue: 0,
      viewWindow: {
        min: 0,
      },
    },
    hAxis: {
      textPosition: 'none',
    },
    backgroundColor: {
      fill: 'transparent',
    },
    legend: 'none',
  };

  if (options ['showtitle'] === undefined || options ['showtitle'] === true)
    chartoptions ['title'] = counter;

  new google.visualization.LineChart(document.getElementById (elementid)).draw (table, chartoptions);
}

function drawIntervalsChart (data, counter, elementid, options) {
  options = typeof options === 'object' ? options : {};

  var table = new google.visualization.DataTable();

  table.addColumn ('string');
  table.addColumn ('number', 'average');
  table.addColumn ({id: 'min', type: 'number', role: 'interval'});
  table.addColumn ({id: 'max', type: 'number', role: 'interval'});

  for (var row = 0, l = data [counter].length; row < l; row++) {
    table.addRow ([
      { v: data [counter][row]["Commit"], f: githubCommitLink (data [counter][row]["Commit"]) },
      data [counter][row]["Average"],
      data [counter][row]["Min"],
      data [counter][row]["Max"]
    ]);
  }

  var chartoptions = {
    vAxis: {
      minValue: 0,
      viewWindow: {
        min: 0,
      },
    },
    hAxis: {
      textPosition: 'none',
    },
    backgroundColor: {
      fill: 'transparent',
    },
    intervals: {
      style: 'area',
    },
    legend: 'none',
  };

  if (options ['showtitle'] === undefined || options ['showtitle'] === true)
    chartoptions ['title'] = counter;

  new google.visualization.LineChart(document.getElementById (elementid)).draw (table, chartoptions);
}
