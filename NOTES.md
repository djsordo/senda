

# Notas configuracion proyecto para MacOs

Al ejecutar `ionic cap sync` se produce un error: `pod install failed`.
Eso se arregla ejecutando pod install, por lo que he visto. 

    cd ios/App
    pod install

Tras este paso, se observa que "pod install" sigue fallando: es evidente
que ionic intenta ejecutarlo automáticamente pero no lo consigue. 

## ✖ Updating iOS native dependencies with pod install - failed!


MacBook-Pro-de-Javier:senda javiermartinezbajo$ ionic cap sync --verbose
  ionic:lib Terminal info: { ci: false, shell: '/bin/zsh', tty: true, windows: false } +0ms
  ionic:lib CLI global options: { _: [ 'cap', 'sync' ], help: null, h: null, verbose: true, quiet: null, interactive: true, color: true, confirm: null, json: null, project: null, '--': [] } +2ms
  ionic:lib:project Project id from defaultProject: mobile +0ms
  ionic:lib:project Project type from config: @ionic/angular (angular) +0ms
  ionic:lib:project Project details: { context: 'multiapp', id: 'mobile', type: 'angular', errors: [], configPath: '/Users/javiermartinezbajo/senda/senda/ionic.config.json' } +0ms
  ionic Context: { binPath: '/Users/javiermartinezbajo/senda/senda/node_modules/@ionic/cli/bin/ionic', 
  libPath: '/Users/javiermartinezbajo/senda/senda/node_modules/@ionic/cli', 
  execPath: '/Users/javiermartinezbajo/senda/senda', version: '6.20.8' } +0ms
  ionic:lib:integrations:capacitor Getting config with Capacitor CLI: [ 'config', '--json' ] +0ms
  ionic:lib:telemetry Sending telemetry for command: 'ionic capacitor sync' [ '--verbose', '--interactive', '--color', '--project=mobile' ] +0ms
  ionic:lib:integrations:capacitor Loaded Capacitor config! +492ms
  ionic:lib:build build options: {
  ionic:lib:build   '--': [],
  ionic:lib:build   engine: 'capacitor',
  ionic:lib:build   platform: undefined,
  ionic:lib:build   project: 'mobile',
  ionic:lib:build   verbose: true,
  ionic:lib:build   configuration: undefined,
  ionic:lib:build   sourcemaps: undefined,
  ionic:lib:build   cordovaAssets: true,
  ionic:lib:build   watch: undefined,
  ionic:lib:build   type: 'angular'
  ionic:lib:build } +0ms
  ionic:lib:hooks Looking for ionic:build:before npm script. +0ms
  ionic:lib:build Looking for ionic:build npm script. +3ms
> ng run mobile:build --verbose
⠙ Generating browser application bundles (phase: setup)...<t> [webpack.cache.PackFileCacheStrategy] restore cache container: 24.842368 ms
⠸ Generating browser application bundles (phase: building)...<t> [webpack.cache.PackFileCacheStrategy] check build dependencies: 4344.004745 ms
<t> [webpack.cache.PackFileCacheStrategy] restore cache content metadata: 21.369419 ms
    [webpack.cache.PackFileCacheStrategy] starting to restore cache content 1 (145 bytes) because of request to: ProgressPlugin|counts
    [webpack.cache.PackFileCacheStrategy] starting to restore cache content 0 (266 MiB) because of request to: ResolverCachePlugin|normal|default|dependencyType=|esm|path=|/Users/javiermartinezbajo/senda/senda|request=|/Users/javiermartinezbajo/senda/senda/projects/mobile/src/main.ts
<t> [webpack.cache.PackFileCacheStrategy] restore cache content 1 (145 bytes): 27.322183 ms
⠴ Generating browser application bundles (phase: building)...    [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|/Users/javiermartinezbajo/senda/senda/node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ruleSet[1].rules[2].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/@ngtools/webpack/src/ivy/index.js!/Users/javiermartinezbajo/senda/senda/projects/mobile/src/main.ts': 1.562223 ms
    [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|javascript/esm|/Users/javiermartinezbajo/senda/senda/node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ruleSet[1].rules[2].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/source-map-loader/dist/cjs.js??ruleSet[1].rules[3]!/Users/javiermartinezbajo/senda/senda/node_modules/@angular/core/fesm2020/core.mjs': 1.626862 ms
    [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|javascript/esm|/Users/javiermartinezbajo/senda/senda/node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ruleSet[1].rules[2].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/source-map-loader/dist/cjs.js??ruleSet[1].rules[3]!/Users/javiermartinezbajo/senda/senda/node_modules/@angular/platform-browser/fesm2020/platform-browser.mjs': 2.127881 ms
    [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|/Users/javiermartinezbajo/senda/senda/node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ruleSet[1].rules[2].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/source-map-loader/dist/cjs.js??ruleSet[1].rules[3]!/Users/javiermartinezbajo/senda/senda/node_modules/@angular/fire/fesm2015/angular-fire-firestore.js': 1.701957 ms
    [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|/Users/javiermartinezbajo/senda/senda/node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ruleSet[1].rules[2].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/source-map-loader/dist/cjs.js??ruleSet[1].rules[3]!/Users/javiermartinezbajo/senda/senda/node_modules/@angular/fire/fesm2015/angular-fire-auth.js': 1.418016 ms
    [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|javascript/esm|/Users/javiermartinezbajo/senda/senda/node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ruleSet[1].rules[2].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/source-map-loader/dist/cjs.js??ruleSet[1].rules[3]!/Users/javiermartinezbajo/senda/senda/node_modules/@angular/router/fesm2020/router.mjs': 3.650364 ms
<w> [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|/Users/javiermartinezbajo/senda/senda/node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ruleSet[1].rules[2].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/source-map-loader/dist/cjs.js??ruleSet[1].rules[3]!/Users/javiermartinezbajo/senda/senda/node_modules/@ionic/angular/fesm2015/ionic-angular.js': 21.561898 ms
    [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|/Users/javiermartinezbajo/senda/senda/node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ruleSet[1].rules[2].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/@ngtools/webpack/src/ivy/index.js!/Users/javiermartinezbajo/senda/senda/projects/mobile/src/app/app-routing.module.ts': 1.468511 ms
    [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|/Users/javiermartinezbajo/senda/senda/node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ruleSet[1].rules[2].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/source-map-loader/dist/cjs.js??ruleSet[1].rules[3]!/Users/javiermartinezbajo/senda/senda/node_modules/rxjs/_esm2015/operators/index.js': 2.210388 ms
    [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|javascript/esm|/Users/javiermartinezbajo/senda/senda/node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ruleSet[1].rules[2].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/source-map-loader/dist/cjs.js??ruleSet[1].rules[3]!/Users/javiermartinezbajo/senda/senda/node_modules/@angular/common/fesm2020/common.mjs': 1.687747 ms
    [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|/Users/javiermartinezbajo/senda/senda/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].rules[0].oneOf[1].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].rules[0].oneOf[1].use[1]!/Users/javiermartinezbajo/senda/senda/node_modules/resolve-url-loader/index.js??ruleSet[1].rules[6].rules[1].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[6].rules[1].use[1]!/Users/javiermartinezbajo/senda/senda/projects/mobile/src/app/app.component.scss?ngResource': 1.264432 ms
    [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|javascript/esm|/Users/javiermartinezbajo/senda/senda/node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ruleSet[1].rules[2].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/source-map-loader/dist/cjs.js??ruleSet[1].rules[3]!/Users/javiermartinezbajo/senda/senda/node_modules/chart.js/dist/chart.js': 1.979066 ms
    [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|javascript/esm|/Users/javiermartinezbajo/senda/senda/node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ruleSet[1].rules[2].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/source-map-loader/dist/cjs.js??ruleSet[1].rules[3]!/Users/javiermartinezbajo/senda/senda/node_modules/lodash-es/lodash.js': 3.062127 ms
    [webpack.cache.PackFileCacheStrategy] Deserialization of 'ResolverCachePlugin|normal|default|fullySpecified=|false|dependencyType=|esm|path=|/Users/javiermartinezbajo/senda/senda/node_modules/chart.js/dist|request=|@kurkle/color': 1.332585 ms
    [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|javascript/esm|/Users/javiermartinezbajo/senda/senda/node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ruleSet[1].rules[2].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/source-map-loader/dist/cjs.js??ruleSet[1].rules[3]!/Users/javiermartinezbajo/senda/senda/node_modules/lodash-es/lodash.default.js': 1.025731 ms
<i> [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|javascript/esm|/Users/javiermartinezbajo/senda/senda/node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ruleSet[1].rules[2].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/source-map-loader/dist/cjs.js??ruleSet[1].rules[3]!/Users/javiermartinezbajo/senda/senda/node_modules/lodash-es/_arrayEach.js': 9.449246 ms
<i> [webpack.cache.PackFileCacheStrategy] Deserialization of 'Compilation/modules|javascript/esm|/Users/javiermartinezbajo/senda/senda/node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ruleSet[1].rules[2].use[0]!/Users/javiermartinezbajo/senda/senda/node_modules/source-map-loader/dist/cjs.js??ruleSet[1].rules[3]!/Users/javiermartinezbajo/senda/senda/node_modules/lodash-es/lang.default.js': 7.637147 ms
<t> [webpack.cache.PackFileCacheStrategy] restore cache content 0 (266 MiB): 717.396141 ms
⠼ Generating browser application bundles (phase: emitting)...    [IdleFileCachePlugin] Initial cache was generated and cache will be persisted in 5s.
✔ Browser application bundle generation complete.
asset vendor.js 5.35 MiB {vendor} [emitted] (name: vendor) (id hint: defaultVendors) 1 related asset
asset projects_mobile_src_app_estadisticas_home_home_module_ts.js 675 KiB {projects_mobile_src_app_estadisticas_home_home_module_ts} [emitted] (name: estadisticas-home-home-module) 1 related asset
asset node_modules_ionic_core_dist_esm_swiper_bundle-28080340_js.js 199 KiB {node_modules_ionic_core_dist_esm_swiper_bundle-28080340_js} [emitted] (name: swiper-bundle-28080340-js) 1 related asset
asset polyfills-core-js.js 152 KiB {polyfills-core-js} [emitted] (name: polyfills-core-js) 1 related asset
asset polyfills.js 145 KiB {polyfills} [emitted] (name: polyfills) 1 related asset
asset node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js.js 136 KiB {node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js} [emitted] 1 related asset
asset default-projects_mobile_src_app_components_components_module_ts.js 105 KiB {default-projects_mobile_src_app_components_components_module_ts} [emitted] (name: modo-jugador-modo-jugador-module) (id hint: default) 1 related asset
asset node_modules_ionic_core_dist_esm_ion-item_8_entry_js.js 99.9 KiB {node_modules_ionic_core_dist_esm_ion-item_8_entry_js} [emitted] 1 related asset
asset projects_mobile_src_app_admin_partidos_admin-partidos_module_ts.js 85.8 KiB {projects_mobile_src_app_admin_partidos_admin-partidos_module_ts} [emitted] (name: admin-partidos-admin-partidos-module) 1 related asset
asset node_modules_ionic_core_dist_esm_ion-modal_entry_js.js 84.6 KiB {node_modules_ionic_core_dist_esm_ion-modal_entry_js} [emitted] 1 related asset
asset node_modules_ionic_core_dist_esm_ion-app_8_entry_js.js 84.1 KiB {node_modules_ionic_core_dist_esm_ion-app_8_entry_js} [emitted] 1 related asset
asset common.js 78 KiB {common} [emitted] (name: common) (id hint: common) 1 related asset
asset node_modules_ionic_core_dist_esm_ion-popover_entry_js.js 65 KiB {node_modules_ionic_core_dist_esm_ion-popover_entry_js} [emitted] 1 related asset
asset node_modules_ionic_core_dist_esm_ion-slide_2_entry_js.js 60.1 KiB {node_modules_ionic_core_dist_esm_ion-slide_2_entry_js} [emitted] 1 related asset
+ 72 assets
Entrypoint main 5.4 MiB (9.11 MiB) = runtime.js 14 KiB vendor.js 5.35 MiB main.js 41.2 KiB 3 auxiliary assets
Entrypoint polyfills 159 KiB (303 KiB) = runtime.js 14 KiB polyfills.js 145 KiB 2 auxiliary assets
Entrypoint styles 62.3 KiB (106 KiB) = runtime.js 14 KiB styles.css 48.3 KiB 2 auxiliary assets
chunk {common} (runtime: runtime) common.js (common) (id hint: common) 53.2 KiB split chunk (cache group: common) (name: common)
  cached modules 53.2 KiB [cached] 18 modules
chunk {default-node_modules_ionic_core_dist_esm_data-cb72448c_js-node_modules_ionic_core_dist_esm_th-29e28e} (runtime: runtime) default-node_modules_ionic_core_dist_esm_data-cb72448c_js-node_modules_ionic_core_dist_esm_th-29e28e.js (id hint: default) 51.5 KiB split chunk (cache group: default)
  cached modules 51.5 KiB [cached] 3 modules
chunk {default-projects_mobile_src_app_components_components_module_ts} (runtime: runtime) default-projects_mobile_src_app_components_components_module_ts.js (modo-jugador-modo-jugador-module) (id hint: default) 70.5 KiB split chunk (cache group: default)
  cached modules 70.5 KiB [cached] 28 modules
chunk {default-projects_mobile_src_app_services_balonmano_service_ts-projects_mobile_src_app_service-28a5ac} (runtime: runtime) default-projects_mobile_src_app_services_balonmano_service_ts-projects_mobile_src_app_service-28a5ac.js (detalle-jugador-detalle-jugador-module) (id hint: default) 12 KiB split chunk (cache group: default)
  cached modules 12 KiB [cached] 2 modules
chunk {default-projects_mobile_src_app_services_estad-partido_service_ts-projects_mobile_src_app_ser-7e8c6b} (runtime: runtime) default-projects_mobile_src_app_services_estad-partido_service_ts-projects_mobile_src_app_ser-7e8c6b.js (home-home-module) (id hint: default) 10.3 KiB split chunk (cache group: default)
  cached modules 10.3 KiB [cached] 4 modules
chunk {default-projects_mobile_src_app_services_string-util_ts} (runtime: runtime) default-projects_mobile_src_app_services_string-util_ts.js (home-home-module) (id hint: default) 11.2 KiB split chunk (cache group: default)
  cached modules 11.2 KiB [cached] 1 module
chunk {main} (runtime: runtime) main.js (main) 19.5 KiB [initial]
  cached modules 19.5 KiB [cached] 11 modules
chunk {node_modules_capacitor-community_speech-recognition_dist_esm_web_js} (runtime: runtime) node_modules_capacitor-community_speech-recognition_dist_esm_web_js.js (web) 711 bytes
  cached modules 711 bytes [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_index-2061d5f6_js} (runtime: runtime) node_modules_ionic_core_dist_esm_index-2061d5f6_js.js (index-2061d5f6-js) 5.34 KiB
  cached modules 5.34 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_input-shims-8459e7d9_js} (runtime: runtime) node_modules_ionic_core_dist_esm_input-shims-8459e7d9_js.js (input-shims-8459e7d9-js) 16.7 KiB
  cached modules 16.7 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_ion-accordion_2_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-accordion_2_entry_js.js 23.6 KiB
  cached modules 23.6 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js.js 28 KiB
  cached modules 28 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-alert_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-alert_entry_js.js 45.5 KiB
  cached modules 45.5 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-app_8_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-app_8_entry_js.js 72.2 KiB
  cached modules 72.2 KiB [cached] 3 modules
chunk {node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js.js 5.68 KiB
  cached modules 5.68 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-back-button_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-back-button_entry_js.js 16.6 KiB
  cached modules 16.6 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-backdrop_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-backdrop_entry_js.js 2.33 KiB
  cached modules 2.33 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_ion-breadcrumb_2_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-breadcrumb_2_entry_js.js 21.9 KiB
  cached modules 21.9 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-button_2_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-button_2_entry_js.js 37.4 KiB
  cached modules 37.4 KiB [cached] 3 modules
chunk {node_modules_ionic_core_dist_esm_ion-card_5_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-card_5_entry_js.js 15.1 KiB
  cached modules 15.1 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-checkbox_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-checkbox_entry_js.js 11.5 KiB
  cached modules 11.5 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-chip_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-chip_entry_js.js 6.43 KiB
  cached modules 6.43 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-col_3_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-col_3_entry_js.js 14.1 KiB
  cached modules 14.1 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_ion-datetime-button_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-datetime-button_entry_js.js 16.5 KiB
  cached modules 16.5 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js.js 125 KiB
  cached modules 125 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_ion-fab_3_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-fab_3_entry_js.js 26.6 KiB
  cached modules 26.6 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-img_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-img_entry_js.js 3.25 KiB
  cached modules 3.25 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js.js 12.9 KiB
  cached modules 12.9 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-input_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-input_entry_js.js 22.7 KiB
  cached modules 22.7 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js.js 33.5 KiB
  cached modules 33.5 KiB [cached] 3 modules
chunk {node_modules_ionic_core_dist_esm_ion-item_8_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-item_8_entry_js.js 93.3 KiB
  cached modules 93.3 KiB [cached] 3 modules
chunk {node_modules_ionic_core_dist_esm_ion-loading_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-loading_entry_js.js 14 KiB
  cached modules 14 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-menu_3_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-menu_3_entry_js.js 35.2 KiB
  cached modules 35.2 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-modal_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-modal_entry_js.js 75.4 KiB
  cached modules 75.4 KiB [cached] 3 modules
chunk {node_modules_ionic_core_dist_esm_ion-nav_2_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-nav_2_entry_js.js 31.4 KiB
  cached modules 31.4 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_ion-picker-column-internal_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-picker-column-internal_entry_js.js 17.2 KiB
  cached modules 17.2 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-picker-internal_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-picker-internal_entry_js.js 21.6 KiB
  cached modules 21.6 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_ion-popover_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-popover_entry_js.js 58.7 KiB
  cached modules 58.7 KiB [cached] 3 modules
chunk {node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js.js 21.9 KiB
  cached modules 21.9 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-radio_2_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-radio_2_entry_js.js 16.5 KiB
  cached modules 16.5 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-range_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-range_entry_js.js 33.2 KiB
  cached modules 33.2 KiB [cached] 3 modules
chunk {node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js.js 47.6 KiB
  cached modules 47.6 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js.js 12.4 KiB
  cached modules 12.4 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js.js 5.28 KiB
  cached modules 5.28 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_ion-route_4_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-route_4_entry_js.js 30.8 KiB
  cached modules 30.8 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-searchbar_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-searchbar_entry_js.js 33.2 KiB
  cached modules 33.2 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-segment_2_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-segment_2_entry_js.js 40.2 KiB
  cached modules 40.2 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-select_3_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-select_3_entry_js.js 30 KiB
  cached modules 30 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-slide_2_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-slide_2_entry_js.js 55.4 KiB
  cached modules 55.4 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_ion-spinner_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-spinner_entry_js.js 8.23 KiB
  cached modules 8.23 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-split-pane_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-split-pane_entry_js.js 8.77 KiB
  cached modules 8.77 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js.js 23.7 KiB
  cached modules 23.7 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-tab_2_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-tab_2_entry_js.js 7.04 KiB
  cached modules 7.04 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_ion-text_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-text_entry_js.js 2.18 KiB
  cached modules 2.18 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-textarea_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-textarea_entry_js.js 20.1 KiB
  cached modules 20.1 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-toast_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-toast_entry_js.js 21.5 KiB
  cached modules 21.5 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-toggle_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-toggle_entry_js.js 19.4 KiB
  cached modules 19.4 KiB [cached] 2 modules
chunk {node_modules_ionic_core_dist_esm_ion-virtual-scroll_entry_js} (runtime: runtime) node_modules_ionic_core_dist_esm_ion-virtual-scroll_entry_js.js 17.7 KiB
  cached modules 17.7 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_status-tap-4d4674a1_js} (runtime: runtime) node_modules_ionic_core_dist_esm_status-tap-4d4674a1_js.js (status-tap-4d4674a1-js) 1.47 KiB
  cached modules 1.47 KiB [cached] 1 module
chunk {node_modules_ionic_core_dist_esm_swiper_bundle-28080340_js} (runtime: runtime) node_modules_ionic_core_dist_esm_swiper_bundle-28080340_js.js (swiper-bundle-28080340-js) 198 KiB
  cached modules 198 KiB [cached] 1 module
chunk {polyfills} (runtime: runtime) polyfills.js (polyfills) 143 KiB [initial]
  cached modules 143 KiB [cached] 3 modules
chunk {polyfills-core-js} (runtime: runtime) polyfills-core-js.js (polyfills-core-js) 152 KiB
  cached modules 152 KiB [cached] 1 module
chunk {polyfills-dom} (runtime: runtime) polyfills-dom.js (polyfills-dom) 26.2 KiB
  cached modules 26.2 KiB [cached] 1 module
chunk {projects_mobile_src_app_add-to-home_add-to-home_module_ts} (runtime: runtime) projects_mobile_src_app_add-to-home_add-to-home_module_ts.js (add-to-home-add-to-home-module) 4.58 KiB
  cached modules 4.58 KiB [cached] 5 modules
chunk {projects_mobile_src_app_admin_clubes_admin-clubes_module_ts} (runtime: runtime) projects_mobile_src_app_admin_clubes_admin-clubes_module_ts.js (admin-clubes-admin-clubes-module) 19.6 KiB
  cached modules 19.6 KiB [cached] 15 modules
chunk {projects_mobile_src_app_admin_equipos_admin-equipos_module_ts} (runtime: runtime) projects_mobile_src_app_admin_equipos_admin-equipos_module_ts.js (admin-equipos-admin-equipos-module) 28.5 KiB
  cached modules 28.5 KiB [cached] 15 modules
chunk {projects_mobile_src_app_admin_home_admin-home_module_ts} (runtime: runtime) projects_mobile_src_app_admin_home_admin-home_module_ts.js (admin-home-admin-home-module) 3.97 KiB
  cached modules 3.97 KiB [cached] 5 modules
chunk {projects_mobile_src_app_admin_partidos_admin-partidos_module_ts} (runtime: runtime) projects_mobile_src_app_admin_partidos_admin-partidos_module_ts.js (admin-partidos-admin-partidos-module) 54 KiB
  cached modules 54 KiB [cached] 25 modules
chunk {projects_mobile_src_app_admin_usuarios_admin-usuarios_module_ts} (runtime: runtime) projects_mobile_src_app_admin_usuarios_admin-usuarios_module_ts.js (admin-usuarios-admin-usuarios-module) 24.9 KiB
  cached modules 24.9 KiB [cached] 15 modules
chunk {projects_mobile_src_app_detalle-jugador_detalle-jugador_module_ts} (runtime: runtime) projects_mobile_src_app_detalle-jugador_detalle-jugador_module_ts.js (detalle-jugador-detalle-jugador-module) 13.9 KiB
  cached modules 13.9 KiB [cached] 8 modules
chunk {projects_mobile_src_app_estad-jugador_estad-jugador_module_ts} (runtime: runtime) projects_mobile_src_app_estad-jugador_estad-jugador_module_ts.js (estad-jugador-estad-jugador-module) 10.4 KiB
  cached modules 10.4 KiB [cached] 6 modules
chunk {projects_mobile_src_app_estadisticas_home_home_module_ts} (runtime: runtime) projects_mobile_src_app_estadisticas_home_home_module_ts.js (estadisticas-home-home-module) 533 KiB
  cached modules 533 KiB [cached] 126 modules
chunk {projects_mobile_src_app_home_home_module_ts} (runtime: runtime) projects_mobile_src_app_home_home_module_ts.js (home-home-module) 26 KiB
  cached modules 26 KiB [cached] 7 modules
chunk {projects_mobile_src_app_inicio-sel-jugadores_inicio-sel-jugadores_module_ts} (runtime: runtime) projects_mobile_src_app_inicio-sel-jugadores_inicio-sel-jugadores_module_ts.js (inicio-sel-jugadores-inicio-sel-jugadores-module) 38.3 KiB
  cached modules 38.3 KiB [cached] 8 modules
chunk {projects_mobile_src_app_listas-estad_listas-estad_module_ts} (runtime: runtime) projects_mobile_src_app_listas-estad_listas-estad_module_ts.js (listas-estad-listas-estad-module) 6.11 KiB
  cached modules 6.11 KiB [cached] 6 modules
chunk {projects_mobile_src_app_login_login_module_ts} (runtime: runtime) projects_mobile_src_app_login_login_module_ts.js (login-login-module) 7.83 KiB
  cached modules 7.83 KiB [cached] 6 modules
chunk {projects_mobile_src_app_microfono_microfono_module_ts} (runtime: runtime) projects_mobile_src_app_microfono_microfono_module_ts.js (microfono-microfono-module) 38.7 KiB
  cached modules 38.7 KiB [cached] 12 modules
chunk {projects_mobile_src_app_modo-accion_modo-accion_module_ts} (runtime: runtime) projects_mobile_src_app_modo-accion_modo-accion_module_ts.js (modo-accion-modo-accion-module) 4.87 KiB
  cached modules 4.87 KiB [cached] 5 modules
chunk {projects_mobile_src_app_modo-jugador_modo-jugador_module_ts} (runtime: runtime) projects_mobile_src_app_modo-jugador_modo-jugador_module_ts.js (modo-jugador-modo-jugador-module) 14.1 KiB
  cached modules 14.1 KiB [cached] 5 modules
chunk {projects_mobile_src_app_modo-ver_modo-ver_module_ts} (runtime: runtime) projects_mobile_src_app_modo-ver_modo-ver_module_ts.js (modo-ver-modo-ver-module) 16.3 KiB
  cached modules 16.3 KiB [cached] 5 modules
chunk {projects_mobile_src_app_privacy_privacy_module_ts} (runtime: runtime) projects_mobile_src_app_privacy_privacy_module_ts.js (privacy-privacy-module) 31.1 KiB
  cached modules 31.1 KiB [cached] 7 modules
chunk {projects_mobile_src_app_registro_registro_module_ts} (runtime: runtime) projects_mobile_src_app_registro_registro_module_ts.js (registro-registro-module) 9.67 KiB
  cached modules 9.67 KiB [cached] 6 modules
chunk {projects_mobile_src_app_share_share_module_ts} (runtime: runtime) projects_mobile_src_app_share_share_module_ts.js (share-share-module) 3.62 KiB
  cached modules 3.62 KiB [cached] 5 modules
chunk {runtime} (runtime: runtime) runtime.js (runtime) 11.3 KiB [entry]
  cached modules 11.3 KiB [cached] 15 modules
chunk {styles} (runtime: runtime) styles.css (styles) 100 bytes (javascript) 39 KiB (css/mini-extract) [initial]
  cached modules 100 bytes (javascript) 39 KiB (css/mini-extract) [cached] 14 modules
chunk {vendor} (runtime: runtime) vendor.js (vendor) (id hint: defaultVendors) 4.87 MiB [initial] split chunk (cache group: defaultVendors) (name: vendor)
  cached modules 4.87 MiB [cached] 161 modules
  

LOG from webpack.Compiler
<t> make hook: 1396.540507 ms
<t> finish make hook: 0.16976 ms
<t> finish compilation: 70.837015 ms
<t> seal compilation: 371.812165 ms
<t> afterCompile hook: 0.186963 ms
<t> emitAssets: 124.220401 ms
<t> emitRecords: 0.101458 ms
<t> done hook: 0.24349 ms
<t> beginIdle: 0.698056 ms

LOG from webpack.Compilation
<t> compute affected modules: 0.298765 ms
<t> finish modules: 51.49664 ms
<t> report dependency errors and warnings: 18.515072 ms
<t> optimize dependencies: 13.981666 ms
<t> create chunks: 30.094548 ms
<t> compute affected modules with chunk graph: 0.152288 ms
<t> optimize: 42.981949 ms
    576 modules hashed, 0 from cache (0.47 variants per module in average)
<t> module hashing: 21.796847 ms
    0% code generated (0 generated, 576 from cache)
<t> code generation: 5.792004 ms
<t> runtime requirements.modules: 2.508545 ms
<t> runtime requirements.chunks: 1.335882 ms
<t> runtime requirements.entries: 5.826119 ms
<t> runtime requirements: 10.037269 ms
<t> hashing: initialize hash: 0.007991 ms
<t> hashing: sort chunks: 0.451579 ms
<t> hashing: hash runtime modules: 6.956361 ms
<t> hashing: hash chunks: 9.997526 ms
<t> hashing: hash digest: 0.06442 ms
<t> hashing: process full hash modules: 0.002171 ms
<t> hashing: 18.422064 ms
    0% code generated (0 generated, 15 from cache)
<t> record hash: 0.064139 ms
<t> module assets: 0.640224 ms
<t> create chunk assets: 7.095503 ms
<t> process assets: 208.186534 ms

LOG from webpack.ResolverCachePlugin
    0% really resolved (0 real resolves with 0 cached but invalid, 12612 cached valid, 0 concurrent)

LOG from webpack.FlagDependencyExportsPlugin
<t> restore cached provided exports: 16.70837 ms
<t> figure out provided exports: 22.020739 ms
    4% of exports of modules have been determined (69 no declared exports, 45 not cached, 1 flagged uncacheable, 1106 from cache, 0 from mem cache, 9 additional calculations due to dependencies)
<t> store provided exports into cache: 0.086614 ms

LOG from webpack.SideEffectsFlagPlugin
<t> update dependencies: 13.304129 ms

LOG from webpack.buildChunkGraph
<t> visitModules: prepare: 4.450201 ms
<t> visitModules: visiting: 7.590101 ms
<t> visitModules: calculating available modules: 0.538034 ms
<t> visitModules: merging available modules: 0.369357 ms
<t> visitModules: check modules for revisit: 0.148158 ms
<t> visitModules: prepare: 3.35595 ms
<t> visitModules: visiting: 5.910629 ms
<t> visitModules: calculating available modules: 0.063398 ms
<t> visitModules: merging available modules: 0.022809 ms
<t> visitModules: check modules for revisit: 0.004713 ms
<t> visitModules: prepare: 0.085037 ms
<t> visitModules: visiting: 0.222953 ms
    1658 queue items processed (835 blocks)
    92 chunk groups connected
    92 chunk groups processed for merging (92 module sets, 0 forked, 0 + 0 modules forked, 0 + 0 modules merged into fork, 0 resulting modules)
    92 chunk group info updated (0 already connected chunk groups reconnected)
<t> visitModules: 15.995516 ms
<t> connectChunkGroups: 0.59316 ms
<t> cleanup: 0.331016 ms

LOG from webpack.SplitChunksPlugin
<t> prepare: 0.090403 ms
<t> modules: 8.71278 ms
<t> queue: 2.061346 ms
<t> maxSize: 0.132296 ms

LOG from webpack.FileSystemInfo
    0 new snapshots created
    22% root snapshot uncached (3073 / 13821)
    6% children snapshot uncached (412 / 6554)
    9099 entries tested
    File info in cache: 823 timestamps 0 hashes 0 timestamp hash combinations
    Directory info in cache: 0 timestamps 0 hashes 0 timestamp hash combinations
    Managed items info in cache: 265 items

2023-04-16 14:41:31: webpack 5.75.0 compiled in 6231 ms (14775c123ba503f8)
✔ Copying assets complete.
✔ Index html generation complete.

Initial Chunk Files                                                                                     | Names                                            |  Raw Size
vendor.js                                                                                               | vendor                                           |   5.35 MB |
polyfills.js                                                                                            | polyfills                                        | 144.78 kB |
styles.css                                                                                              | styles                                           |  48.32 kB |
main.js                                                                                                 | main                                             |  41.18 kB |
runtime.js                                                                                              | runtime                                          |  13.95 kB |

| Initial Total                                    |   5.59 MB

Lazy Chunk Files                                                                                        | Names                                            |  Raw Size
projects_mobile_src_app_estadisticas_home_home_module_ts.js                                             | estadisticas-home-home-module                    | 675.21 kB |
node_modules_ionic_core_dist_esm_swiper_bundle-28080340_js.js                                           | swiper-bundle-28080340-js                        | 198.68 kB |
polyfills-core-js.js                                                                                    | polyfills-core-js                                | 152.19 kB |
node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js.js                                             | -                                                | 135.69 kB |
default-projects_mobile_src_app_components_components_module_ts.js                                      | modo-jugador-modo-jugador-module                 | 104.71 kB |
node_modules_ionic_core_dist_esm_ion-item_8_entry_js.js                                                 | -                                                |  99.86 kB |
projects_mobile_src_app_admin_partidos_admin-partidos_module_ts.js                                      | admin-partidos-admin-partidos-module             |  85.79 kB |
node_modules_ionic_core_dist_esm_ion-modal_entry_js.js                                                  | -                                                |  84.58 kB |
node_modules_ionic_core_dist_esm_ion-app_8_entry_js.js                                                  | -                                                |  84.06 kB |
common.js                                                                                               | common                                           |  77.96 kB |
node_modules_ionic_core_dist_esm_ion-popover_entry_js.js                                                | -                                                |  65.02 kB |
node_modules_ionic_core_dist_esm_ion-slide_2_entry_js.js                                                | -                                                |  60.10 kB |
default-node_modules_ionic_core_dist_esm_data-cb72448c_js-node_modules_ionic_core_dist_esm_th-29e28e.js | -                                                |  55.73 kB |
node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js.js                                            | -                                                |  54.99 kB |
projects_mobile_src_app_microfono_microfono_module_ts.js                                                | microfono-microfono-module                       |  53.96 kB |
node_modules_ionic_core_dist_esm_ion-alert_entry_js.js                                                  | -                                                |  51.76 kB |
projects_mobile_src_app_inicio-sel-jugadores_inicio-sel-jugadores_module_ts.js                          | inicio-sel-jugadores-inicio-sel-jugadores-module |  48.05 kB |
projects_mobile_src_app_admin_equipos_admin-equipos_module_ts.js                                        | admin-equipos-admin-equipos-module               |  46.54 kB |
node_modules_ionic_core_dist_esm_ion-segment_2_entry_js.js                                              | -                                                |  44.04 kB |
projects_mobile_src_app_admin_usuarios_admin-usuarios_module_ts.js                                      | admin-usuarios-admin-usuarios-module             |  42.49 kB |
node_modules_ionic_core_dist_esm_ion-menu_3_entry_js.js                                                 | -                                                |  41.50 kB |
node_modules_ionic_core_dist_esm_ion-button_2_entry_js.js                                               | -                                                |  41.04 kB |
node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js.js                                          | -                                                |  38.53 kB |
node_modules_ionic_core_dist_esm_ion-range_entry_js.js                                                  | -                                                |  37.67 kB |
projects_mobile_src_app_privacy_privacy_module_ts.js                                                    | privacy-privacy-module                           |  37.25 kB |
node_modules_ionic_core_dist_esm_ion-searchbar_entry_js.js                                              | -                                                |  36.73 kB |
projects_mobile_src_app_home_home_module_ts.js                                                          | home-home-module                                 |  36.23 kB |
projects_mobile_src_app_admin_clubes_admin-clubes_module_ts.js                                          | admin-clubes-admin-clubes-module                 |  36.15 kB |
node_modules_ionic_core_dist_esm_ion-nav_2_entry_js.js                                                  | -                                                |  35.82 kB |
node_modules_ionic_core_dist_esm_ion-route_4_entry_js.js                                                | -                                                |  35.19 kB |
node_modules_ionic_core_dist_esm_ion-select_3_entry_js.js                                               | -                                                |  35.14 kB |
node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js.js                                           | -                                                |  33.15 kB |
node_modules_ionic_core_dist_esm_ion-fab_3_entry_js.js                                                  | -                                                |  30.19 kB |
node_modules_ionic_core_dist_esm_ion-accordion_2_entry_js.js                                            | -                                                |  27.17 kB |
node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js.js                                              | -                                                |  26.66 kB |
polyfills-dom.js                                                                                        | polyfills-dom                                    |  26.61 kB |
node_modules_ionic_core_dist_esm_ion-toast_entry_js.js                                                  | -                                                |  26.16 kB |
node_modules_ionic_core_dist_esm_ion-input_entry_js.js                                                  | -                                                |  25.72 kB |
node_modules_ionic_core_dist_esm_ion-breadcrumb_2_entry_js.js                                           | -                                                |  25.36 kB |
node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js.js                                           | -                                                |  24.56 kB |
projects_mobile_src_app_modo-ver_modo-ver_module_ts.js                                                  | modo-ver-modo-ver-module                         |  23.33 kB |
node_modules_ionic_core_dist_esm_ion-picker-internal_entry_js.js                                        | -                                                |  23.23 kB |
node_modules_ionic_core_dist_esm_ion-textarea_entry_js.js                                               | -                                                |  22.89 kB |
projects_mobile_src_app_detalle-jugador_detalle-jugador_module_ts.js                                    | detalle-jugador-detalle-jugador-module           |  22.81 kB |
node_modules_ionic_core_dist_esm_ion-toggle_entry_js.js                                                 | -                                                |  22.77 kB |
projects_mobile_src_app_modo-jugador_modo-jugador_module_ts.js                                          | modo-jugador-modo-jugador-module                 |  21.02 kB |
node_modules_ionic_core_dist_esm_ion-picker-column-internal_entry_js.js                                 | -                                                |  20.33 kB |
node_modules_ionic_core_dist_esm_ion-radio_2_entry_js.js                                                | -                                                |  19.76 kB |
node_modules_ionic_core_dist_esm_ion-back-button_entry_js.js                                            | -                                                |  19.65 kB |
node_modules_ionic_core_dist_esm_ion-virtual-scroll_entry_js.js                                         | -                                                |  19.37 kB |
node_modules_ionic_core_dist_esm_ion-datetime-button_entry_js.js                                        | -                                                |  19.22 kB |
node_modules_ionic_core_dist_esm_input-shims-8459e7d9_js.js                                             | input-shims-8459e7d9-js                          |  18.58 kB |
node_modules_ionic_core_dist_esm_ion-card_5_entry_js.js                                                 | -                                                |  18.53 kB |
node_modules_ionic_core_dist_esm_ion-loading_entry_js.js                                                | -                                                |  18.08 kB |
projects_mobile_src_app_registro_registro_module_ts.js                                                  | registro-registro-module                         |  17.06 kB |
projects_mobile_src_app_estad-jugador_estad-jugador_module_ts.js                                        | estad-jugador-estad-jugador-module               |  16.47 kB |
node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js.js                                      | -                                                |  15.98 kB |
default-projects_mobile_src_app_services_estad-partido_service_ts-projects_mobile_src_app_ser-7e8c6b.js | home-home-module                                 |  15.90 kB |
node_modules_ionic_core_dist_esm_ion-col_3_entry_js.js                                                  | -                                                |  15.74 kB |
node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js.js                                              | -                                                |  15.31 kB |
node_modules_ionic_core_dist_esm_ion-checkbox_entry_js.js                                               | -                                                |  14.10 kB |
default-projects_mobile_src_app_services_balonmano_service_ts-projects_mobile_src_app_service-28a5ac.js | detalle-jugador-detalle-jugador-module           |  14.04 kB |
projects_mobile_src_app_login_login_module_ts.js                                                        | login-login-module                               |  13.68 kB |
default-projects_mobile_src_app_services_string-util_ts.js                                              | home-home-module                                 |  12.51 kB |
projects_mobile_src_app_listas-estad_listas-estad_module_ts.js                                          | listas-estad-listas-estad-module                 |  11.97 kB |
node_modules_ionic_core_dist_esm_ion-spinner_entry_js.js                                                | -                                                |  10.70 kB |
node_modules_ionic_core_dist_esm_ion-split-pane_entry_js.js                                             | -                                                |  10.13 kB |
projects_mobile_src_app_modo-accion_modo-accion_module_ts.js                                            | modo-accion-modo-accion-module                   |   9.75 kB |
node_modules_ionic_core_dist_esm_ion-tab_2_entry_js.js                                                  | -                                                |   9.71 kB |
projects_mobile_src_app_add-to-home_add-to-home_module_ts.js                                            | add-to-home-add-to-home-module                   |   9.19 kB |
projects_mobile_src_app_admin_home_admin-home_module_ts.js                                              | admin-home-admin-home-module                     |   8.54 kB |
node_modules_ionic_core_dist_esm_ion-chip_entry_js.js                                                   | -                                                |   8.47 kB |
node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js.js                                               | -                                                |   8.23 kB |
projects_mobile_src_app_share_share_module_ts.js                                                        | share-share-module                               |   8.18 kB |
node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js.js                                          | -                                                |   6.64 kB |
node_modules_ionic_core_dist_esm_index-2061d5f6_js.js                                                   | index-2061d5f6-js                                |   6.35 kB |
node_modules_ionic_core_dist_esm_ion-img_entry_js.js                                                    | -                                                |   4.53 kB |
node_modules_ionic_core_dist_esm_ion-text_entry_js.js                                                   | -                                                |   4.16 kB |
node_modules_ionic_core_dist_esm_ion-backdrop_entry_js.js                                               | -                                                |   3.49 kB |
node_modules_ionic_core_dist_esm_status-tap-4d4674a1_js.js                                              | status-tap-4d4674a1-js                           |   2.91 kB |
node_modules_capacitor-community_speech-recognition_dist_esm_web_js.js                                  | web                                              |   1.68 kB |

Build at: 2023-04-16T12:41:32.517Z - Hash: 14775c123ba503f8 - Time: 7512ms
  ionic:lib:hooks Looking for ionic:build:after npm script. +12s
> capacitor sync
[capacitor] 2023-04-16T12:41:33.721Z capacitor:config config: {
[capacitor]   android: {
[capacitor]     name: 'android',
[capacitor]     minVersion: '21',
[capacitor]     studioPath: LazyPromise [Promise] {
[capacitor]       <pending>,
[capacitor]       _executor: [AsyncFunction (anonymous)]
[capacitor]     },
[capacitor]     platformDir: 'android',
[capacitor]     platformDirAbs: '/Users/javiermartinezbajo/senda/senda/android',
[capacitor]     cordovaPluginsDir: 'capacitor-cordova-android-plugins',
[capacitor]     cordovaPluginsDirAbs: '/Users/javiermartinezbajo/senda/senda/android/capacitor-cordova-android-plugins',
[capacitor]     appDir: 'app',
[capacitor]     appDirAbs: '/Users/javiermartinezbajo/senda/senda/android/app',
[capacitor]     srcDir: 'app/src',
[capacitor]     srcDirAbs: '/Users/javiermartinezbajo/senda/senda/android/app/src',
[capacitor]     srcMainDir: 'app/src/main',
[capacitor]     srcMainDirAbs: '/Users/javiermartinezbajo/senda/senda/android/app/src/main',
[capacitor]     assetsDir: 'app/src/main/assets',
[capacitor]     assetsDirAbs: '/Users/javiermartinezbajo/senda/senda/android/app/src/main/assets',
[capacitor]     webDir: 'app/src/main/assets/public',
[capacitor]     webDirAbs: '/Users/javiermartinezbajo/senda/senda/android/app/src/main/assets/public',
[capacitor]     resDir: 'app/src/main/res',
[capacitor]     resDirAbs: '/Users/javiermartinezbajo/senda/senda/android/app/src/main/res',
[capacitor]     apkName: 'app-debug.apk',
[capacitor]     buildOutputDir: 'app/build/outputs/apk//debug',
[capacitor]     buildOutputDirAbs: '/Users/javiermartinezbajo/senda/senda/android/app/build/outputs/apk/debug',
[capacitor]     flavor: ''
[capacitor]   },
[capacitor]   ios: {
[capacitor]     name: 'ios',
[capacitor]     minVersion: '12.0',
[capacitor]     platformDir: 'ios',
[capacitor]     platformDirAbs: '/Users/javiermartinezbajo/senda/senda/ios',
[capacitor]     scheme: 'App',
[capacitor]     cordovaPluginsDir: 'capacitor-cordova-ios-plugins',
[capacitor]     cordovaPluginsDirAbs: '/Users/javiermartinezbajo/senda/senda/ios/capacitor-cordova-ios-plugins',
[capacitor]     nativeProjectDir: 'App',
[capacitor]     nativeProjectDirAbs: '/Users/javiermartinezbajo/senda/senda/ios/App',
[capacitor]     nativeTargetDir: 'App/App',
[capacitor]     nativeTargetDirAbs: '/Users/javiermartinezbajo/senda/senda/ios/App/App',
[capacitor]     nativeXcodeProjDir: 'App/App.xcodeproj',
[capacitor]     nativeXcodeProjDirAbs: '/Users/javiermartinezbajo/senda/senda/ios/App/App.xcodeproj',
[capacitor]     nativeXcodeWorkspaceDir: LazyPromise [Promise] {
[capacitor]       <pending>,
[capacitor]       _executor: [AsyncFunction (anonymous)]
[capacitor]     },
[capacitor]     nativeXcodeWorkspaceDirAbs: LazyPromise [Promise] {
[capacitor]       <pending>,
[capacitor]       _executor: [AsyncFunction (anonymous)]
[capacitor]     },
[capacitor]     webDir: LazyPromise [Promise] {
[capacitor]       <pending>,
[capacitor]       _executor: [AsyncFunction (anonymous)]
[capacitor]     },
[capacitor]     webDirAbs: LazyPromise [Promise] {
[capacitor]       <pending>,
[capacitor]       _executor: [AsyncFunction (anonymous)]
[capacitor]     },
[capacitor]     podPath: 'pod'
[capacitor]   },
[capacitor]   web: {
[capacitor]     name: 'web',
[capacitor]     platformDir: 'www/mobile',
[capacitor]     platformDirAbs: '/Users/javiermartinezbajo/senda/senda/www/mobile'
[capacitor]   },
[capacitor]   cli: {
[capacitor]     rootDir: '/Users/javiermartinezbajo/senda/senda/node_modules/@capacitor/cli',
[capacitor]     assetsDir: 'assets',
[capacitor]     assetsDirAbs: '/Users/javiermartinezbajo/senda/senda/node_modules/@capacitor/cli/assets',
[capacitor]     assets: { ios: [Object], android: [Object] },
[capacitor]     package: {
[capacitor]       name: '@capacitor/cli',
[capacitor]       version: '3.5.1',
[capacitor]       description: 'Capacitor: Cross-platform apps with JavaScript and the web',
[capacitor]       homepage: 'https://capacitorjs.com',
[capacitor]       author: 'Ionic Team <hi@ionic.io> (https://ionic.io)',
[capacitor]       license: 'MIT',
[capacitor]       repository: [Object],
[capacitor]       bugs: [Object],
[capacitor]       files: [Array],
[capacitor]       keywords: [Array],
[capacitor]       engines: [Object],
[capacitor]       main: 'dist/index.js',
[capacitor]       types: 'dist/declarations.d.ts',
[capacitor]       bin: [Object],
[capacitor]       scripts: [Object],
[capacitor]       dependencies: [Object],
[capacitor]       devDependencies: [Object],
[capacitor]       jest: [Object],
[capacitor]       publishConfig: [Object],
[capacitor]       gitHead: '009064dbf01cbc5900bbc16053b6d7535ad4c2b4'
[capacitor]     },
[capacitor]     os: 'mac'
[capacitor]   },
[capacitor]   app: {
[capacitor]     rootDir: '/Users/javiermartinezbajo/senda/senda',
[capacitor]     appId: 'com.sendaestadisticas',
[capacitor]     appName: 'senda',
[capacitor]     webDir: 'www/mobile',
[capacitor]     webDirAbs: '/Users/javiermartinezbajo/senda/senda/www/mobile',
[capacitor]     package: {
[capacitor]       name: 'senda',
[capacitor]       version: '0.0.1',
[capacitor]       author: 'Ionic Framework',
[capacitor]       homepage: 'https://ionicframework.com/',
[capacitor]       scripts: [Object],
[capacitor]       private: true,
[capacitor]       dependencies: [Object],
[capacitor]       devDependencies: [Object],
[capacitor]       description: 'An Ionic project'
[capacitor]     },
[capacitor]     extConfigType: 'ts',
[capacitor]     extConfigName: 'capacitor.config.ts',
[capacitor]     extConfigFilePath: '/Users/javiermartinezbajo/senda/senda/capacitor.config.ts',
[capacitor]     extConfig: {
[capacitor]       appId: 'com.sendaestadisticas',
[capacitor]       appName: 'senda',
[capacitor]       webDir: 'www/mobile',
[capacitor]       bundledWebRuntime: false,
[capacitor]       android: [Object],
[capacitor]       ios: [Object]
[capacitor]     },
[capacitor]     bundledWebRuntime: false
[capacitor]   }
[capacitor] }
[capacitor] ✔ Copying web assets from mobile to android/app/src/main/assets/public in 1.11s
[capacitor] ✔ Creating capacitor.config.json in android/app/src/main/assets in 1.24ms
[capacitor] ✔ copy android in 1.15s
[capacitor] ✔ Updating Android plugins in 10.57ms
[capacitor] [info] Found 5 Capacitor plugins for android:
[capacitor]        @capacitor-community/speech-recognition@2.1.0
[capacitor]        @capacitor/app@1.1.1
[capacitor]        @capacitor/haptics@1.1.4
[capacitor]        @capacitor/keyboard@1.2.2
[capacitor]        @capacitor/status-bar@1.0.8
[capacitor] 2023-04-16T12:41:35.066Z capacitor:android:update Searching 3 source files in '/Users/javiermartinezbajo/senda/senda/node_modules/@capacitor-community/speech-recognition/android/src/main' by /^@(?:CapacitorPlugin|NativePlugin)[\s\S]+?class ([\w]+)/gm regex
[capacitor] 2023-04-16T12:41:35.068Z capacitor:android:update Searching '/Users/javiermartinezbajo/senda/senda/node_modules/@capacitor-community/speech-recognition/android/src/main/java/com/getcapacitor/community/speechrecognition/SpeechRecognition.java' for package by /^package ([\w.]+);?$/gm regex
[capacitor] 2023-04-16T12:41:35.068Z capacitor:android:update 'com.getcapacitor.community.speechrecognition.SpeechRecognition' is a suitable plugin class
[capacitor] 2023-04-16T12:41:35.071Z capacitor:android:update Searching 1 source files in '/Users/javiermartinezbajo/senda/senda/node_modules/@capacitor/app/android/src/main' by /^@(?:CapacitorPlugin|NativePlugin)[\s\S]+?class ([\w]+)/gm regex
[capacitor] 2023-04-16T12:41:35.072Z capacitor:android:update Searching '/Users/javiermartinezbajo/senda/senda/node_modules/@capacitor/app/android/src/main/java/com/capacitorjs/plugins/app/AppPlugin.java' for package by /^package ([\w.]+);?$/gm regex
[capacitor] 2023-04-16T12:41:35.072Z capacitor:android:update 'com.capacitorjs.plugins.app.AppPlugin' is a suitable plugin class
[capacitor] 2023-04-16T12:41:35.075Z capacitor:android:update Searching 6 source files in '/Users/javiermartinezbajo/senda/senda/node_modules/@capacitor/haptics/android/src/main' by /^@(?:CapacitorPlugin|NativePlugin)[\s\S]+?class ([\w]+)/gm regex
[capacitor] 2023-04-16T12:41:35.077Z capacitor:android:update Searching '/Users/javiermartinezbajo/senda/senda/node_modules/@capacitor/haptics/android/src/main/java/com/capacitorjs/plugins/haptics/HapticsPlugin.java' for package by /^package ([\w.]+);?$/gm regex
[capacitor] 2023-04-16T12:41:35.077Z capacitor:android:update 'com.capacitorjs.plugins.haptics.HapticsPlugin' is a suitable plugin class
[capacitor] 2023-04-16T12:41:35.080Z capacitor:android:update Searching 2 source files in '/Users/javiermartinezbajo/senda/senda/node_modules/@capacitor/keyboard/android/src/main' by /^@(?:CapacitorPlugin|NativePlugin)[\s\S]+?class ([\w]+)/gm regex
[capacitor] 2023-04-16T12:41:35.081Z capacitor:android:update Searching '/Users/javiermartinezbajo/senda/senda/node_modules/@capacitor/keyboard/android/src/main/java/com/capacitorjs/plugins/keyboard/KeyboardPlugin.java' for package by /^package ([\w.]+);?$/gm regex
[capacitor] 2023-04-16T12:41:35.081Z capacitor:android:update 'com.capacitorjs.plugins.keyboard.KeyboardPlugin' is a suitable plugin class
[capacitor] 2023-04-16T12:41:35.084Z capacitor:android:update Searching 3 source files in '/Users/javiermartinezbajo/senda/senda/node_modules/@capacitor/status-bar/android/src/main' by /^@(?:CapacitorPlugin|NativePlugin)[\s\S]+?class ([\w]+)/gm regex
[capacitor] 2023-04-16T12:41:35.085Z capacitor:android:update Searching '/Users/javiermartinezbajo/senda/senda/node_modules/@capacitor/status-bar/android/src/main/java/com/capacitorjs/plugins/statusbar/StatusBarPlugin.java' for package by /^package ([\w.]+);?$/gm regex
[capacitor] 2023-04-16T12:41:35.085Z capacitor:android:update 'com.capacitorjs.plugins.statusbar.StatusBarPlugin' is a suitable plugin class
[capacitor] ✔ update android in 97.76ms
[capacitor] ✔ Copying web assets from mobile to ios/App/App/public in 1.26s
[capacitor] ✔ Creating capacitor.config.json in ios/App/App in 1.05ms
[capacitor] ✔ copy ios in 1.30s
[capacitor] ✔ Updating iOS plugins in 10.99ms
[capacitor] [info] Found 5 Capacitor plugins for ios:
[capacitor]        @capacitor-community/speech-recognition@2.1.0
[capacitor]        @capacitor/app@1.1.1
[capacitor]        @capacitor/haptics@1.1.4
[capacitor]        @capacitor/keyboard@1.2.2
[capacitor]        @capacitor/status-bar@1.0.8
[capacitor] ✖ Updating iOS native dependencies with pod install - failed!
[capacitor] ✖ update ios - failed!
[capacitor] [error] xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance
[capacitor]         
[ERROR] An error occurred while running subprocess capacitor.
        
        capacitor sync exited with exit code 1.
        
        Re-running this command with the --verbose flag may provide more information.
  ionic:utils-process onBeforeExit handler: 'process.exit' received +0ms
  ionic:utils-process onBeforeExit handler: running 2 functions +0ms
  ionic:utils-process processExit: exiting (exit code: 1) +44ms
MacBook-Pro-de-Javier:senda javiermartinezbajo$ 

