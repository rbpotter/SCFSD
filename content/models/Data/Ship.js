/// <reference path="../../TypeDefs/knockout.postbox.d.ts"/>
var SCFSD;
(function (SCFSD) {
    var Ship = (function () {
        function Ship(shipName, className) {
            var _this = this;
            this.shipName = shipName;
            if (!className) {
                this.className = shipName;
            }
            else {
                this.className = className;
            }
            this.shipCount = ko.observable().extend({ notify: 'always', rateLimit: 1 });
            this.shipOutput = ko.computed(function () {
                var fragments = new Array();
                for (var i = 0; i < _this.shipCount(); i++) {
                    fragments.push(new ShipFragment(_this.shipName, _this.className));
                }
                return fragments;
            }).extend({ notify: 'always' });
            this.shipCount.subscribe(function (newValue) {
                ko.postbox.publish("SaveShips", _this);
            });
        }
        return Ship;
    })();
    SCFSD.Ship = Ship;
    var ShipFragment = (function () {
        function ShipFragment(shipName, className) {
            this.shipName = shipName;
            this.className = className;
        }
        return ShipFragment;
    })();
    SCFSD.ShipFragment = ShipFragment;
})(SCFSD || (SCFSD = {}));
