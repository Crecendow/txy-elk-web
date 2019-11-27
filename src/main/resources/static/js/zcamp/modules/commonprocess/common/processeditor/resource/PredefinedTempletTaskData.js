define(function () {

    return {
        "resourceId": "sid-6D2853C2-0CA0-4B72-9993-FC3F5B745E2F",
        "properties": {
            "type": -1,
            "name": null,
            "notes": "",
            "extProperties": {},
            "width": 2000,
            "height": 2000
        },
        "stencil": {
            "type": "BPMNDiagram"
        },
        "childShapes": [
            {
                "resourceId": "sid-19BDF23F-9532-464B-9A7B-CDEDBBDED214",
                "properties": {
                    "name": "开始环节",
                    "operationIcons": [
                        {
                            "name": "DEL"
                        },
                        {
                            "name": "JAGGED"
                        }
                    ],
                    "type": 29
                },
                "stencil": {
                    "type": "StartNoneEvent"
                },
                "childShapes": [],
                "outgoing": [
                    "sid-F24C004C-C66B-4DDE-B961-B5BE7A614E35"
                ],
                "bounds": {
                    "upperLeft": {
                        "x": 90,
                        "y": 80
                    },
                    "lowerRight": {
                        "x": 125,
                        "y": 115
                    }
                },
                "isLinkedOutTask": true
            },
            {
                "resourceId": "sid-6BD21B3D-9479-4211-BB4E-EBC2AC70BFB6",
                "properties": {
                    "name": "简单环节",
                    "operationIcons": [
                        {
                            "name": "DEL"
                        },
                        {
                            "name": "JAGGED"
                        }
                    ],
                    "type": -1
                },
                "stencil": {
                    "type": "CpSimpleTask"
                },
                "childShapes": [],
                "outgoing": [],
                "bounds": {
                    "upperLeft": {
                        "x": 170,
                        "y": 170
                    },
                    "lowerRight": {
                        "x": 270,
                        "y": 230
                    }
                },
                "isLinkedInTask": true
            },
            {
                "resourceId": "sid-F24C004C-C66B-4DDE-B961-B5BE7A614E35",
                "properties": {
                    "type": 14,
                    "name": null,
                    "notes": "",
                    "extProperties": {}
                },
                "stencil": {
                    "type": "SequenceFlow"
                },
                "childShapes": [],
                "outgoing": [
                    "sid-6BD21B3D-9479-4211-BB4E-EBC2AC70BFB6"
                ],
                "bounds": {
                    "upperLeft": {
                        "x": 0,
                        "y": 0
                    },
                    "lowerRight": {
                        "x": 172,
                        "y": 206
                    }
                },
                "style": {
                    "lineType": "jagged",
                    "sPos": "right",
                    "ePos": "left",
                    "stroke": "#000"
                },
                "text": {
                    "text": null
                },
                "symbol": {
                    "type": "arrow"
                },
                "dockers": [
                    {
                        "x": 125.5,
                        "y": 98
                    },
                    {
                        "x": 155.5,
                        "y": 98
                    },
                    {
                        "x": 155.5,
                        "y": 149
                    },
                    {
                        "x": 140,
                        "y": 149
                    },
                    {
                        "x": 140,
                        "y": 200
                    },
                    {
                        "x": 170,
                        "y": 200
                    }
                ]
            }
        ],
        "outgoing": [],
        "bounds": {
            "upperLeft": {
                "x": 0,
                "y": 0
            },
            "lowerRight": {
                "x": 0,
                "y": 0
            }
        },
        "cpTplProcess": {
            "id": null,
            "bisDomain": null,
            "category": "普通流程",
            "code": "TEST_DIAGRAM",
            "comments": null,
            "createdDate": null,
            "createdUser": null,
            "name": "测试流程图流程",
            "state": "A"
        }
    };
});