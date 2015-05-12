---
title: Performance Monitoring
---

<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript">
  runScripts.push (function () {;
    function error (message) {
      $("#errormessage").html (message);
    }

    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(function () {
      $.getScript ("/docs/about-mono/performance/utils.js")
        .fail (function () {
          error ("Utils file not found");
        })
        .done (function () {
          $.eachasync ($(".config"), 33, function (el) {
            var config = $(el).data ("config");
            $.get ("http://storage.bos.xamarin.com/benchmarker/graphs/mono/amd64/" + config + ".config.json")
              .fail (function () {
                $(config + "-chart").html ("Data not found");
              })
              .done (function (data) {
                drawIntervalsChart (data, "Time", config + "-chart", { showtitle: false });
              });
          });

          $.eachasync ($(".benchmark"), 33, function (el) {
            var benchmark = $(el).data ("benchmark");
            $.get ("http://storage.bos.xamarin.com/benchmarker/graphs/mono/amd64/" + benchmark + ".json")
              .fail (function () {
                $(benchmark + "-chart").html ("Data not found");
              })
              .done (function (data) {
                drawLineChart (data, "Time", benchmark + "-chart", { showtitle: false });
              });
          });
        });
    })
  });
</script>

<span id="errormessage"></span>

Present performance monitoring for every versions of Mono. This data is aggregated with the Mono Benchmarker that can be found on <a href="https://github.com/xamarin/benchmarker">GitHub</a>

Configs
-------

{% assign configs = "default" | split: "|" %}

<table>
  <tr>
    <th>Config</th>
    <th>Time</th>
  </tr>
  {% for config in configs %}
    <tr class="config" data-config="{{ config }}">
      <td style="width:200px"><a href="config_{{ config }}">{{ config }}</a></td>
      <td style="width:800px"><div id="{{ config }}-chart-container"><div id="{{ config }}-chart" style="width:100%;height:200px"></div></div></td>
    </tr>
  {% endfor %}
</table>

Benchmarks
----------

{% assign benchmarks = "ahcbench|bh|binarytree|bisort|db|euler|except|fsharp|grandetracer|graph4|graph8|hash|health|ipy|lcscbench|lists|mandelbrot|message|objinst|onelist|perimeter|raytracer2|raytracer3|roslyn|sharpchess|sharpsatbench|specraytracer|strcat" | split: "|" %}

<table>
  <tr>
    <th>Benchmark</th>
    <th>Time</th>
  </tr>
  {% for benchmark in benchmarks %}
    <tr class="benchmark" data-benchmark="{{ benchmark }}">
      <td style="width:200px"><a href="{{ benchmark }}">{{ benchmark }}</a></td>
      <td style="width:800px"><div id="{{ benchmark }}-chart-container"><div id="{{ benchmark }}-chart" style="width:100%;height:100px"></div></div></td>
    </tr>
  {% endfor %}
</table>
