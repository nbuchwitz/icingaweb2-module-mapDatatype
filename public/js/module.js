(function (Icinga) {
    var MapDatatype = function (module) {
        this.module = module;
        this.initialize();
    };

    MapDatatype.prototype = {
        initialize: function () {
            // Fetch map config
            var that = this;
            $.getJSON(icinga.config.baseUrl + '/map/config/fetch', this._newMap).fail(function (jqxhr, textStatus, error) {
                that._newMap({
                    "default_zoom": "4",
                    "default_long": '13.377485',
                    "default_lat": '52.515855',
                    "min_zoom": "2",
                    "max_zoom": "19",
                    "max_native_zoom": "19",
                    "tile_url": "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                });
            });
        },
        _newMap: function (config) {
            var btn_save = $('#director-map-btn-save');
            var btn_globe = $('#director-map-btn-globe');
            var btn_cancel = $('#director-map-btn-cancel');

            var field = btn_globe.parent().find("input[type=text]");
            var map = L.map('map-director').setView([config.default_lat, config.default_long], config.default_zoom);
            var marker;

            L.tileLayer(config.tile_url, {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                maxNativeZoom: config.map_max_native_zoom,
                maxZoom: config.map_max_zoom,
                minZoom: config.map_min_zoom
            }).addTo(map);

            L.control.locate({
                icon: 'icon-pin',
                //strings: {title: translation['btn-locate']}
            }).addTo(map);

            // search button
            var options = {
                limit: 5,
                lite: 1,
            };
            var control = L.Control.openCageSearch(options).addTo(map);

            control.setMarker(function (result) {
                setMarker(result.center.lat, result.center.lng);
            });

            hideMap();

            map.on('click', function (e) {
                    setMarker(e.latlng.lat, e.latlng.lng);
                }
            );

            btn_globe.click(function () {
                showMap();
            });

            btn_save.click(function () {
                saveCoordinates();
            });

            btn_cancel.click(function () {
                hideMap();
            });

            function setMarker(lat, lng) {
                if (hasMarker()) {
                    map.removeLayer(marker);
                }

                marker = new L.Marker([lat, lng], {
                    icon: L.AwesomeMarkers.icon({
                        icon: 'globe',
                        markerColor: 'blue',
                        className: 'awesome-marker',
                        autoPan: true
                    })
                });
                marker.addTo(map);

                map.setView([lat, lng], config.max_zoom);
            }

            function hasMarker() {
                return marker instanceof L.Marker;
            }

            function saveCoordinates() {
                if (hasMarker()) {
                    var pos = marker.getLatLng();

                    if (field === undefined) {
                        console.error("Could not get input field");
                        return;
                    }

                    field.val(pos.lat + "," + pos.lng);
                }
                hideMap();
            }

            function hideMap() {
                btn_cancel.hide();
                btn_save.hide();
                btn_globe.show();
                field.show();
                $('#map-director').hide();
            }

            function showMap() {
                if (field.val()) {
                    var latlng = field.val().split(",");
                    setMarker(latlng[0], latlng[1]);
                } else if (field.attr('placeholder')) {
                    var match = /^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)/.exec(field.attr('placeholder'));

                    if (match.length === 5) {
                        setMarker(match[1], match[3]);
                    }
                }

                btn_save.show();
                btn_cancel.show();
                btn_globe.hide();
                field.hide();
                $('#map-director').show();
                map.invalidateSize();
            }
        },

    };

    Icinga.availableModules.mapDatatype = MapDatatype;
}(Icinga));
