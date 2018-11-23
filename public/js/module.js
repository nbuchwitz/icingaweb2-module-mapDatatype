(function (Icinga) {
    var MapDatatype = function (module) {
        this.module = module;
        this.initialize();
    };

    MapDatatype.prototype = {
        initialize: function () {
            var btn_save = $('#director-map-btn-save');
            var btn_globe = $('#director-map-btn-globe');
            var btn_cancel = $('#director-map-btn-cancel');

            var field = btn_globe.parent().find("input[type=text]");

            // @TODO: Change default coordinates
            var map = L.map('map-director').setView([51.505, -0.09], 13);
            var marker;

            L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.control.locate({
                icon: 'icon-pin',
                //strings: {title: translation['btn-locate']}
            }).addTo(map);

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

                marker = L.marker([lat, lng], {autoPan: true});
                marker.addTo(map);

                map.setView([lat, lng], map.getZoom());
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
