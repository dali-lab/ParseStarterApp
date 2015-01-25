exports.config =
  # See http://brunch.io/#documentation for docs.
  plugins:
    autoReload:
      enabled:
        css: on
        js: on
        assets: off
  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^bower_components/
      # order:
      #   after: [
      #     '**/parse.autocomplete*.js'
      #   ]
      pluginHelpers: 'javascript/vendor.js'
    stylesheets:
      joinTo:
        'styles/vendor.css': /^bower_components/
        'styles/app.css': /^app/
    templates:
      defaultExtension: 'jst'
      joinTo:
        'js/templates.js': /^app\/templates/
