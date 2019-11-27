
define([
], function () {
    
    return {

        regenerateResourceIdForSharps: function(sharps) {
            var me = this,
                resourceIdCache = {};

            // 重新生成sharp的id，并将对应关系放入缓存中
            fish.each(sharps, function (sharp) {
                var currResourceId = sharp.resourceId;
                me.regenerateResourceIdForSharp(sharp);

                var newResourceId = sharp.resourceId;
                resourceIdCache[currResourceId] = newResourceId;
            });

            // 重新构建outgoing连线关系
            fish.each(sharps, function (sharp) {
                var currOutgoing = sharp.outgoing;
                var newOutgoing = [];

                fish.each(currOutgoing, function (item) {
                    newOutgoing.push(resourceIdCache[item]);
                });

                sharp.outgoing = newOutgoing;
            });

            return sharps;
        },

        regenerateResourceIdForSharp: function(sharp) {
            var me = this,
                resourceId = me.newResourceId();

            sharp.resourceId = resourceId;

            return sharp;
        },

        newResourceId: function () {
            return this.getUUID();
        },

        getUUID: function () {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
                uuid = new Array(36),
                rnd = 0,
                r;
            for (var i = 0; i < 36; i++) {
                if (i == 8 || i == 13 || i == 18 || i == 23) {
                    uuid[i] = '-';
                } else if (i == 14) {
                    uuid[i] = '4';
                } else {
                    if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                    r = rnd & 0xf;
                    rnd = rnd >> 4;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
            return "sid-" + uuid.join('');
        }
    };
});