export const config = {
    filters: [
        {
            "name": "Academic Year",
            "id": "academicYear",
            "labelProp": "academicyear",
            "valueProp": "academicyear_id",
            "query": "select academicyear_id, academicyear from dimensions.academicyear order by academicyear_id asc"
        }
    ],
    config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "timeSeriesQueries": '',
        "queries": {
            "avg_score": "select round( (sum(criteria_met)*100)/count(school_id) ) as percent_school_met_criteria FROM (select cctv.school_id,  cctv.academicyear_id,  cctv.sum as has_cctv,  water.sum as has_water,  toilet.sum as has_toilet,  cwsn_toilet.sum as has_cwsn_toilet,  electricity.sum as has_electricity,  library.sum as has_library,  handwash.sum as has_handwash,  solar_panel.sum as has_solarpanel,  playground.sum as has_playground, case when (cctv.sum::int+water.sum::int+toilet.sum::int+cwsn_toilet.sum::int+electricity.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 9 then 1 else 0 end as criteria_met,  school.school_name,  district_name,  block_name,  cluster_name from datasets.school_infra_cctv_school0academicyear as cctv inner join datasets.school_infra_drinkingwater_school0academicyear as water on cctv.school_id = water.school_id and cctv.academicyear_id = water.academicyear_id inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_cwsntoilet_school0academicyear as cwsn_toilet on cwsn_toilet.school_id = water.school_id and cwsn_toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_electricty_school0academicyear as electricity on electricity.school_id = water.school_id and electricity.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = cctv.school_id) as intermediate_table",

            "district_map": `
                    SELECT DISTRICT_ID,
                    DISTRICT_NAME,
                    LATITUDE,
	 		        LONGITUDE,
                    HAS_WATER,
                    TOTAL_NO_OF_SCHOOLS,
                    ROUND(CAST(HAS_WATER / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC), 2) AS PERCENT_SCHOOL_MET_WATER,
                    ROUND(CAST(HAS_TOILET / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC), 2) AS PERCENT_SCHOOL_MET_TOILET,
                    ROUND(CAST(HAS_LIBRARY / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC), 2) AS PERCENT_SCHOOL_MET_LIBRARY,
                    ROUND(CAST(HAS_HANDWASH / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC), 2) AS PERCENT_SCHOOL_MET_HANDWASH,
                    ROUND(CAST(HAS_SOLARPANEL / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC), 2) AS PERCENT_SCHOOL_MET_SOLARPANEL,
                    ROUND(CAST(HAS_PLAYGROUND / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC), 2) AS PERCENT_SCHOOL_MET_PLAYGROUND,
                    ROUND(CAST(ALL_CRITERIA / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC), 2) AS PERCENT_SCHOOL_MET_ALL_CRITERIA
                FROM
                    (SELECT DISTRICT_ID,
                            DISTRICT_NAME,
                            AVG(CAST (LATITUDE AS numeric)) AS LATITUDE,
	                        AVG(CAST (LONGITUDE AS numeric)) AS LONGITUDE,
                            COUNT(WATER.SCHOOL_ID) AS TOTAL_NO_OF_SCHOOLS,
                            SUM(WATER.SUM) AS HAS_WATER,
                            SUM(TOILET.SUM) AS HAS_TOILET,
                            SUM(LIBRARY.SUM) AS HAS_LIBRARY,
                            SUM(HANDWASH.SUM) AS HAS_HANDWASH,
                            SUM(SOLAR_PANEL.SUM) AS HAS_SOLARPANEL,
                            SUM(PLAYGROUND.SUM) AS HAS_PLAYGROUND,
                            SUM(CASE
                                            WHEN (WATER.SUM::int + TOILET.SUM::int + LIBRARY.SUM::int + HANDWASH.SUM::int + SOLAR_PANEL.SUM::int + PLAYGROUND.SUM::int) = 6 THEN 1
                                            ELSE 0
                            END) AS ALL_CRITERIA
                        FROM DATASETS.SCHOOL_INFRA_DRINKINGWATER_B2JVNMBOSWX_BMLDVWJ7 AS WATER
                        INNER JOIN DATASETS.SCHOOL_INFRA_TOILET_FMPGCLNMWWBZCR5RPHCO AS TOILET ON TOILET.SCHOOL_ID = WATER.SCHOOL_ID
                        AND TOILET.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_LIBRARY_CHVSCH9QVW9NEX0NBW0K AS LIBRARY ON LIBRARY.SCHOOL_ID = WATER.SCHOOL_ID
                        AND LIBRARY.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_HANDWASH_FMZ7A3FTY2NOB28OM1GA AS HANDWASH ON HANDWASH.SCHOOL_ID = WATER.SCHOOL_ID
                        AND HANDWASH.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_SOLARPANEL_L2N5FMPNV2XSBHROQHWD AS SOLAR_PANEL ON SOLAR_PANEL.SCHOOL_ID = WATER.SCHOOL_ID
                        AND SOLAR_PANEL.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_PLAYGROUND_INTSFGR8XGRSBHROQH8A AS PLAYGROUND ON PLAYGROUND.SCHOOL_ID = WATER.SCHOOL_ID
                        AND PLAYGROUND.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DIMENSIONS.SCHOOL ON SCHOOL.SCHOOL_ID = WATER.SCHOOL_ID
                        WHERE filter.water.academicYear
                        GROUP BY DISTRICT_ID, DISTRICT_NAME) AS INTERMEDIATE_TABLE
                GROUP BY DISTRICT_ID,
                    DISTRICT_NAME,
                    LATITUDE,
                    LONGITUDE,
                    HAS_WATER,
                    HAS_TOILET,
                    HAS_LIBRARY,
                    HAS_HANDWASH,
                    HAS_SOLARPANEL,
                    HAS_PLAYGROUND,
                    ALL_CRITERIA,
                    TOTAL_NO_OF_SCHOOLS
            `,
            "district_avg_score": "select district_name, round( (sum(criteria_met)*100)/count(school_id) ) as percent_school_met_criteria, round( (sum(has_water)*100)/count(school_id) ) as percent_school_has_water, round( (sum(has_toilet)*100)/count(school_id) ) as percent_school_has_toilet, round( (sum(has_library)*100)/count(school_id) ) as percent_school_has_library, round( (sum(has_handwash)*100)/count(school_id) ) as percent_school_has_handwash, round( (sum(has_solarpanel)*100)/count(school_id) ) as percent_school_has_solarpanel, round( (sum(has_playground)*100)/count(school_id) ) as percent_school_has_playground FROM (select water.academicyear_id as academicyear_id, water.school_id as school_id, water.sum as has_water, toilet.sum as has_toilet, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (water.sum::int+toilet.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 6 then 1 else 0 end as criteria_met, school.school_name, district_name, block_name, cluster_name from datasets.school_infra_drinkingwater_school0academicyear as water inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = water.school_id) as intermediate_table  group by district_name",
        },
        "levels": '',
        "filters": [

        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "District",
                        property: "district_name",
                        class: "text-center"
                    },
                    {
                        name: "Have Drinking Water",
                        property: "percent_school_has_water",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Toilet",
                        property: "percent_school_has_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have CWSN Toilet",
                        property: "percent_school_has_cswn_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Electricity",
                        property: "percent_school_has_electricity",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have CCTV Cameras",
                        property: "percent_school_has_cctv",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Library",
                        property: "percent_school_has_library",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Handwash",
                        property: "percent_school_has_handwash",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Solar Panel",
                        property: "percent_school_has_solarpanel",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Playgrounds",
                        property: "percent_school_has_playground",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                ],
                "sortByProperty": "district_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            },
            "map": {
                "indicator": "percent_school_met_all_criteria",
                "metricFilterNeeded": false,
                "legend": { "title": "District-wise Performance" },
                "indicatorType": "percent",
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District ID: ",
                        "value": "district_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Total number of schools: ",
                        "value": "total_no_of_schools",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Schools meeting 100% criteria: ",
                        "value": "percent_school_met_all_criteria",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with Toilet: ",
                        "value": "percent_school_met_toilet",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with Playground: ",
                        "value": "percent_school_met_playground",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with solar panel: ",
                        "value": "percent_school_met_solarpanel",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with drinking water: ",
                        "value": "percent_school_met_water",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with library: ",
                        "value": "percent_school_met_library",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with handwash: ",
                        "value": "percent_school_met_handwash",
                        "valueSuffix": "%\n"
                    }
                ]
            }
        }
    },

    district_config: {
        "label": "Schools Infrastructure",
        "defaultLevel": "state",
        "hideTab": true,
        "timeSeriesQueries":'',
        "queries": {
            "district_map": `
                    SELECT BLOCK_ID,
                    BLOCK_NAME,
                    LATITUDE,
                    LONGITUDE,
                    HAS_WATER,
                    TOTAL_NO_OF_SCHOOLS,
                    ROUND(CAST(HAS_WATER / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC), 2) AS PERCENT_SCHOOL_MET_WATER,
                    ROUND(CAST(HAS_TOILET / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC), 2) AS PERCENT_SCHOOL_MET_TOILET,
                    ROUND(CAST(HAS_LIBRARY / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC), 2) AS PERCENT_SCHOOL_MET_LIBRARY,
                    ROUND(CAST(HAS_HANDWASH / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC), 2) AS PERCENT_SCHOOL_MET_HANDWASH,
                    ROUND(CAST(HAS_SOLARPANEL / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC), 2) AS PERCENT_SCHOOL_MET_SOLARPANEL,
                    ROUND(CAST(HAS_PLAYGROUND / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC), 2) AS PERCENT_SCHOOL_MET_PLAYGROUND,
                    ROUND(CAST(ALL_CRITERIA / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC), 2) AS PERCENT_SCHOOL_MET_ALL_CRITERIA
                FROM
                    (SELECT BLOCK_ID,
                            BLOCK_NAME,
                            AVG(CAST (LATITUDE AS numeric)) AS LATITUDE,
	                        AVG(CAST (LONGITUDE AS numeric)) AS LONGITUDE,
                            COUNT(WATER.SCHOOL_ID) AS TOTAL_NO_OF_SCHOOLS,
                            SUM(WATER.SUM) AS HAS_WATER,
                            SUM(TOILET.SUM) AS HAS_TOILET,
                            SUM(LIBRARY.SUM) AS HAS_LIBRARY,
                            SUM(HANDWASH.SUM) AS HAS_HANDWASH,
                            SUM(SOLAR_PANEL.SUM) AS HAS_SOLARPANEL,
                            SUM(PLAYGROUND.SUM) AS HAS_PLAYGROUND,
                            SUM(CASE
                                            WHEN (WATER.SUM::int + TOILET.SUM::int + LIBRARY.SUM::int + HANDWASH.SUM::int + SOLAR_PANEL.SUM::int + PLAYGROUND.SUM::int) = 6 THEN 1
                                            ELSE 0
                            END) AS ALL_CRITERIA
                        FROM DATASETS.SCHOOL_INFRA_DRINKINGWATER_B2JVNMBOSWX_BMLDVWJ7 AS WATER
                        INNER JOIN DATASETS.SCHOOL_INFRA_TOILET_FMPGCLNMWWBZCR5RPHCO AS TOILET ON TOILET.SCHOOL_ID = WATER.SCHOOL_ID
                        AND TOILET.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_LIBRARY_CHVSCH9QVW9NEX0NBW0K AS LIBRARY ON LIBRARY.SCHOOL_ID = WATER.SCHOOL_ID
                        AND LIBRARY.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_HANDWASH_FMZ7A3FTY2NOB28OM1GA AS HANDWASH ON HANDWASH.SCHOOL_ID = WATER.SCHOOL_ID
                        AND HANDWASH.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_SOLARPANEL_L2N5FMPNV2XSBHROQHWD AS SOLAR_PANEL ON SOLAR_PANEL.SCHOOL_ID = WATER.SCHOOL_ID
                        AND SOLAR_PANEL.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_PLAYGROUND_INTSFGR8XGRSBHROQH8A AS PLAYGROUND ON PLAYGROUND.SCHOOL_ID = WATER.SCHOOL_ID
                        AND PLAYGROUND.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DIMENSIONS.SCHOOL ON SCHOOL.SCHOOL_ID = WATER.SCHOOL_ID
                        WHERE DISTRICT_ID = {district_id} AND filter.water.academicYear
                        GROUP BY BLOCK_ID,
                            BLOCK_NAME) AS INTERMEDIATE_TABLE
                GROUP BY BLOCK_ID,
                    BLOCK_NAME,
                    LATITUDE,
			        LONGITUDE,
                    HAS_WATER,
                    HAS_TOILET,
                    HAS_LIBRARY,
                    HAS_HANDWASH,
                    HAS_SOLARPANEL,
                    HAS_PLAYGROUND,
                    ALL_CRITERIA,
                    TOTAL_NO_OF_SCHOOLS
            `
        },
        "levels":'',
        "filters": [
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "actions": {
                    "queries": {
                        "avg_score": "select round( (sum(criteria_met)*100)/count(school_id) ) as percent_school_met_criteria FROM (select water.academicyear_id as academicyear_id, water.school_id as school_id, water.sum as has_water, toilet.sum as has_toilet, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (water.sum::int+toilet.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 6 then 1 else 0 end as criteria_met, school.school_name, district_name, district_id, block_name, cluster_name from datasets.school_infra_drinkingwater_school0academicyear as water inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = water.school_id) as intermediate_table where  district_id = {district_id}",

                        "district_avg_score": "select block_name, round( (sum(has_water)*100)/count(school_id) ) as percent_school_has_water, round( (sum(has_toilet)*100)/count(school_id) ) as percent_school_has_toilet, round( (sum(has_library)*100)/count(school_id) ) as percent_school_has_library, round( (sum(has_handwash)*100)/count(school_id) ) as percent_school_has_handwash, round( (sum(has_solarpanel)*100)/count(school_id) ) as percent_school_has_solarpanel, round( (sum(has_playground)*100)/count(school_id) ) as percent_school_has_playground FROM (select water.academicyear_id as academicyear_id, water.school_id as school_id, water.sum as has_water, toilet.sum as has_toilet, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (water.sum::int+toilet.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 6 then 1 else 0 end as criteria_met, school.school_name, district_name, district_id, block_name, block_id, cluster_name from datasets.school_infra_drinkingwater_school0academicyear as water inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = water.school_id) as intermediate_table where  district_id = {district_id} group by block_name;",
                    }
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Block",
                        property: "block_name",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Drinking Water",
                        property: "percent_school_has_water",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Toilet",
                        property: "percent_school_has_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have CWSN Toilet",
                        property: "percent_school_has_cswn_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Electricity",
                        property: "percent_school_has_electricity",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have CCTV Cameras",
                        property: "percent_school_has_cctv",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Library",
                        property: "percent_school_has_library",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Handwash",
                        property: "percent_school_has_handwash",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Solar Panel",
                        property: "percent_school_has_solarpanel",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Playgrounds",
                        property: "percent_school_has_playground",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                ],
                "sortByProperty": "district_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            },
            "map": {
                "indicator": "percent_school_met_all_criteria",
                "metricFilterNeeded": false,
                "legend": { "title": "Block-wise Performance" },
                "indicatorType": "percent",
                "tooltipMetrics": [
                    {
                        "valuePrefix": "Block ID: ",
                        "value": "block_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Block Name: ",
                        "value": "block_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Total number of schools: ",
                        "value": "total_no_of_schools",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Schools meeting 100% criteria: ",
                        "value": "percent_school_met_all_criteria",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with Toilet: ",
                        "value": "percent_school_met_toilet",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with Playground: ",
                        "value": "percent_school_met_playground",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with solar panel: ",
                        "value": "percent_school_met_solarpanel",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with drinking water: ",
                        "value": "percent_school_met_water",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with library: ",
                        "value": "percent_school_met_library",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with handwash: ",
                        "value": "percent_school_met_handwash",
                        "valueSuffix": "%\n"
                    }
                ]
            }
        }
    },

    block_config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "hideTab": true,
        "timeSeriesQueries": '',
        "queries": {
            "district_map": `
                    SELECT CLUSTER_ID,
                    CLUSTER_NAME,
                    LATITUDE,
                    LONGITUDE,
                    HAS_WATER,
                    TOTAL_NO_OF_SCHOOLS,
                    ROUND(CAST(HAS_WATER / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC),
                        2) AS PERCENT_SCHOOL_MET_WATER,
                    ROUND(CAST(HAS_TOILET / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC),
                        2) AS PERCENT_SCHOOL_MET_TOILET,
                    ROUND(CAST(HAS_LIBRARY / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC),
                        2) AS PERCENT_SCHOOL_MET_LIBRARY,
                    ROUND(CAST(HAS_HANDWASH / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC),
                        2) AS PERCENT_SCHOOL_MET_HANDWASH,
                    ROUND(CAST(HAS_SOLARPANEL / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC),
                        2) AS PERCENT_SCHOOL_MET_SOLARPANEL,
                    ROUND(CAST(HAS_PLAYGROUND / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC),
                        2) AS PERCENT_SCHOOL_MET_PLAYGROUND,
                    ROUND(CAST(ALL_CRITERIA / TOTAL_NO_OF_SCHOOLS * 100 AS NUMERIC),
                        2) AS PERCENT_SCHOOL_MET_ALL_CRITERIA
                FROM
                    (SELECT CLUSTER_ID,
                            CLUSTER_NAME,
                            AVG(CAST (LATITUDE AS numeric)) AS LATITUDE,
                            AVG(CAST (LONGITUDE AS numeric)) AS LONGITUDE,
                            COUNT(WATER.SCHOOL_ID) AS TOTAL_NO_OF_SCHOOLS,
                            SUM(WATER.SUM) AS HAS_WATER,
                            SUM(TOILET.SUM) AS HAS_TOILET,
                            SUM(LIBRARY.SUM) AS HAS_LIBRARY,
                            SUM(HANDWASH.SUM) AS HAS_HANDWASH,
                            SUM(SOLAR_PANEL.SUM) AS HAS_SOLARPANEL,
                            SUM(PLAYGROUND.SUM) AS HAS_PLAYGROUND,
                            SUM(CASE
                                                            WHEN (WATER.SUM::int + TOILET.SUM::int + LIBRARY.SUM::int + HANDWASH.SUM::int + SOLAR_PANEL.SUM::int + PLAYGROUND.SUM::int) = 6 THEN 1
                                                            ELSE 0
                                            END) AS ALL_CRITERIA
                        FROM DATASETS.SCHOOL_INFRA_DRINKINGWATER_B2JVNMBOSWX_BMLDVWJ7 AS WATER
                        INNER JOIN DATASETS.SCHOOL_INFRA_TOILET_FMPGCLNMWWBZCR5RPHCO AS TOILET ON TOILET.SCHOOL_ID = WATER.SCHOOL_ID
                        AND TOILET.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_LIBRARY_CHVSCH9QVW9NEX0NBW0K AS LIBRARY ON LIBRARY.SCHOOL_ID = WATER.SCHOOL_ID
                        AND LIBRARY.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_HANDWASH_FMZ7A3FTY2NOB28OM1GA AS HANDWASH ON HANDWASH.SCHOOL_ID = WATER.SCHOOL_ID
                        AND HANDWASH.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_SOLARPANEL_L2N5FMPNV2XSBHROQHWD AS SOLAR_PANEL ON SOLAR_PANEL.SCHOOL_ID = WATER.SCHOOL_ID
                        AND SOLAR_PANEL.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_PLAYGROUND_INTSFGR8XGRSBHROQH8A AS PLAYGROUND ON PLAYGROUND.SCHOOL_ID = WATER.SCHOOL_ID
                        AND PLAYGROUND.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DIMENSIONS.SCHOOL ON SCHOOL.SCHOOL_ID = WATER.SCHOOL_ID
                        WHERE BLOCK_ID = {block_id} AND filter.water.academicYear
                        GROUP BY CLUSTER_ID,
                            CLUSTER_NAME) AS INTERMEDIATE_TABLE
                GROUP BY CLUSTER_ID,
                    CLUSTER_NAME,
                    LATITUDE,
                    LONGITUDE,
                    HAS_WATER,
                    HAS_TOILET,
                    HAS_LIBRARY,
                    HAS_HANDWASH,
                    HAS_SOLARPANEL,
                    HAS_PLAYGROUND,
                    ALL_CRITERIA,
                    TOTAL_NO_OF_SCHOOLS
            `
        },
        "levels": '',
        "filters": [
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "actions": {
                    "queries": {
                        "avg_score": "select round( ( sum(criteria_met)* 100 )/ count(school_id) ) as percent_school_met_criteria FROM (select water.academicyear_id as academicyear_id, water.school_id as school_id, water.sum as has_water, toilet.sum as has_toilet, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (water.sum::int+toilet.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) =6 then 1 else 0 end as criteria_met, school.school_name, district_name, block_name, block_id, cluster_name from datasets.school_infra_drinkingwater_school0academicyear as water inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = water.school_id) as intermediate_table where block_id = {block_id}",

                        "district_avg_score": "select cluster_name, round( (sum(has_water)*100)/count(school_id) ) as percent_school_has_water, round( (sum(has_toilet)*100)/count(school_id) ) as percent_school_has_toilet, round( (sum(has_library)*100)/count(school_id) ) as percent_school_has_library, round( (sum(has_handwash)*100)/count(school_id) ) as percent_school_has_handwash, round( (sum(has_solarpanel)*100)/count(school_id) ) as percent_school_has_solarpanel, round( (sum(has_playground)*100)/count(school_id) ) as percent_school_has_playground FROM (select water.academicyear_id as academicyear_id, water.school_id as school_id, water.sum as has_water, toilet.sum as has_toilet, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (water.sum::int+toilet.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 6 then 1 else 0 end as criteria_met, school.school_name, district_name, district_id, block_name, block_id, cluster_name from datasets.school_infra_drinkingwater_school0academicyear as water inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = water.school_id) as intermediate_table where  block_id = {block_id} group by cluster_name"
                    }
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Cluster",
                        property: "cluster_name",
                        class: "text-center"
                    },
                    {
                        name: "Have Drinking Water",
                        property: "percent_school_has_water",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Toilet",
                        property: "percent_school_has_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have CWSN Toilet",
                        property: "percent_school_has_cswn_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Electricity",
                        property: "percent_school_has_electricity",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have CCTV Cameras",
                        property: "percent_school_has_cctv",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Library",
                        property: "percent_school_has_library",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Handwash",
                        property: "percent_school_has_handwash",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Solar Panel",
                        property: "percent_school_has_solarpanel",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Playgrounds",
                        property: "percent_school_has_playground",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                ],
                "sortByProperty": "district_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            },
            "map": {
                "indicator": "percent_school_met_all_criteria",
                "metricFilterNeeded": false,
                "legend": { "title": "Cluster-wise Performance" },
                "indicatorType": "percent",
                "tooltipMetrics": [
                    {
                        "valuePrefix": "Cluster ID: ",
                        "value": "cluster_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Cluster Name: ",
                        "value": "cluster_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Total number of schools: ",
                        "value": "total_no_of_schools",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Schools meeting 100% criteria: ",
                        "value": "percent_school_met_all_criteria",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with Toilet: ",
                        "value": "percent_school_met_toilet",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with Playground: ",
                        "value": "percent_school_met_playground",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with solar panel: ",
                        "value": "percent_school_met_solarpanel",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with drinking water: ",
                        "value": "percent_school_met_water",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with library: ",
                        "value": "percent_school_met_library",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Schools with handwash: ",
                        "value": "percent_school_met_handwash",
                        "valueSuffix": "%\n"
                    }
                ]
            }
        }
    },

    cluster_config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "hideTab": true,
        "timeSeriesQueries": '',
        "queries": {
            "district_map": `
                    SELECT SCHOOL_ID,
                    SCHOOL_NAME,
                    LATITUDE,
                    LONGITUDE,
                    CASE
                                    WHEN INTERMEDIATE_TABLE.HAS_WATER = 1 THEN 'Yes'
                                    ELSE 'No'
                    END AS HAS_WATER,
                    CASE
                                    WHEN INTERMEDIATE_TABLE.HAS_TOILET = 1 THEN 'Yes'
                                    ELSE 'No'
                    END AS HAS_TOILET,
                    CASE
                                    WHEN INTERMEDIATE_TABLE.HAS_LIBRARY = 1 THEN 'Yes'
                                    ELSE 'No'
                    END AS HAS_LIBRARY,
                    CASE
                                    WHEN INTERMEDIATE_TABLE.HAS_HANDWASH = 1 THEN 'Yes'
                                    ELSE 'No'
                    END AS HAS_HANDWASH,
                    CASE
                                    WHEN INTERMEDIATE_TABLE.HAS_SOLARPANEL = 1 THEN 'Yes'
                                    ELSE 'No'
                    END AS HAS_SOLARPANEL,
                    CASE
                                    WHEN INTERMEDIATE_TABLE.HAS_PLAYGROUND = 1 THEN 'Yes'
                                    ELSE 'No'
                    END AS HAS_PLAYGROUND,
                    ROUND(CAST(INTERMEDIATE_TABLE.ALL_CRITERIA AS NUMERIC) / 6 * 100, 2) AS PERCENT_SCHOOL_MET_ALL_CRITERIA
                FROM
                    (SELECT 
                            CLUSTER_ID,
                            WATER.ACADEMICYEAR_ID,
                            WATER.SCHOOL_ID AS SCHOOL_ID,
                            SCHOOL.SCHOOL_NAME,
                            LATITUDE,
                            LONGITUDE,
                            WATER.SUM AS HAS_WATER,
                            TOILET.SUM AS HAS_TOILET,
                            LIBRARY.SUM AS HAS_LIBRARY,
                            HANDWASH.SUM AS HAS_HANDWASH,
                            SOLAR_PANEL.SUM AS HAS_SOLARPANEL,
                            PLAYGROUND.SUM AS HAS_PLAYGROUND,
                            (WATER.SUM::int + TOILET.SUM::int + LIBRARY.SUM::int + HANDWASH.SUM::int + SOLAR_PANEL.SUM::int + PLAYGROUND.SUM::int) AS ALL_CRITERIA
                        FROM DATASETS.SCHOOL_INFRA_DRINKINGWATER_B2JVNMBOSWX_BMLDVWJ7 AS WATER
                        INNER JOIN DATASETS.SCHOOL_INFRA_TOILET_FMPGCLNMWWBZCR5RPHCO AS TOILET ON TOILET.SCHOOL_ID = WATER.SCHOOL_ID
                        AND TOILET.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_LIBRARY_CHVSCH9QVW9NEX0NBW0K AS LIBRARY ON LIBRARY.SCHOOL_ID = WATER.SCHOOL_ID
                        AND LIBRARY.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_HANDWASH_FMZ7A3FTY2NOB28OM1GA AS HANDWASH ON HANDWASH.SCHOOL_ID = WATER.SCHOOL_ID
                        AND HANDWASH.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_SOLARPANEL_L2N5FMPNV2XSBHROQHWD AS SOLAR_PANEL ON SOLAR_PANEL.SCHOOL_ID = WATER.SCHOOL_ID
                        AND SOLAR_PANEL.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DATASETS.SCHOOL_INFRA_PLAYGROUND_INTSFGR8XGRSBHROQH8A AS PLAYGROUND ON PLAYGROUND.SCHOOL_ID = WATER.SCHOOL_ID
                        AND PLAYGROUND.ACADEMICYEAR_ID = WATER.ACADEMICYEAR_ID
                        INNER JOIN DIMENSIONS.SCHOOL ON SCHOOL.SCHOOL_ID = WATER.SCHOOL_ID WHERE CLUSTER_ID = {cluster_id} AND filter.water.academicYear) AS INTERMEDIATE_TABLE
                GROUP BY SCHOOL_NAME,
                    SCHOOL_ID,
                    LATITUDE,
                    LONGITUDE,
                    INTERMEDIATE_TABLE.HAS_WATER,
                    INTERMEDIATE_TABLE.HAS_TOILET,
                    INTERMEDIATE_TABLE.HAS_LIBRARY,
                    INTERMEDIATE_TABLE.HAS_HANDWASH,
                    INTERMEDIATE_TABLE.HAS_SOLARPANEL,
                    INTERMEDIATE_TABLE.HAS_PLAYGROUND,
                    INTERMEDIATE_TABLE.ALL_CRITERIA
            `
        },
        "levels": '',
        "filters": [
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "actions": {
                    "queries": {
                        "avg_score": "select round( (sum(criteria_met)*100)/count(school_id) ) as percent_school_met_criteria FROM (select water.academicyear_id as academicyear_id, water.school_id as school_id, water.sum as has_water, toilet.sum as has_toilet, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (water.sum::int+toilet.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 6 then 1 else 0 end as criteria_met, school.school_name, district_name, district_id, block_name, block_id, cluster_name, cluster_id from datasets.school_infra_drinkingwater_B2JvNmBoSWx_bmldVWJ7 as water inner join datasets.school_infra_toilet_fmpgclNmWWBzCR5RPhcO as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_cHVscH9QVW9nex0Nbw0K as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_fmZ7a3FtY2Nob28OM1gA as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_L2N5fmpnV2xSbHRoQhwD as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_IntsfGR8XGRSbHRoQh8A as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = water.school_id) as intermediate_table where cluster_id={cluster_id};",
                        "district_avg_score": "select school_name, case when has_water = 1 THEN 'YES' ELSE 'NO' END as has_water, case when has_toilet = 1 THEN 'YES' ELSE 'NO' END as has_toilet, case when has_library = 1 THEN 'YES' ELSE 'NO' END as has_library, case when has_handwash = 1 THEN 'YES' ELSE 'NO' END as has_handwash, case when has_solarpanel = 1 THEN 'YES' ELSE 'NO' END as has_solarpanel, case when has_playground = 1 THEN 'YES' ELSE 'NO' END as has_playground FROM (select water.academicyear_id as academicyear_id, water.school_id as school_id, water.sum as has_water, toilet.sum as has_toilet, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (water.sum::int+toilet.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 6 then 1 else 0 end as criteria_met, school.school_name, district_name, district_id, block_name, block_id, cluster_name, cluster_id from datasets.school_infra_drinkingwater_school0academicyear as water inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = water.school_id) as intermediate_table where cluster_id = {cluster_id}"
                    }
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "School",
                        property: "school_name",
                        class: "text-center"
                    },
                    {
                        name: "Have Drinking Water",
                        property: "has_water",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }

                            ]
                        }
                    },
                    {
                        name: "Have Toilet",
                        property: "has_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }

                            ]
                        }
                    },
                    {
                        name: "Have CWSN Toilet",
                        property: "has_cwsn_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }

                            ]
                        }
                    },
                    {
                        name: "Have Electricity",
                        property: "has_electricity",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }

                            ]
                        }
                    },
                    {
                        name: "Have CCTV Cameras",
                        property: "has_cctv",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }

                            ]
                        }
                    },
                    {
                        name: "Have Library",
                        property: "has_library",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }

                            ]
                        }
                    },
                    {
                        name: "Have Handwash",
                        property: "has_handwash",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }

                            ]
                        }
                    },
                    {
                        name: "Have Solar Panel",
                        property: "has_solarpanel",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }

                            ]
                        }
                    },
                    {
                        name: "Have Playgrounds",
                        property: "has_playground",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }

                            ]
                        }
                    },
                ],
                "sortByProperty": "school_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            },
            "map": {
                "indicator": "percent_school_met_all_criteria",
                "metricFilterNeeded": false,
                "legend": { "title": "School-wise Performance" },
                "indicatorType": "percent",
                "tooltipMetrics": [
                    {
                        "valuePrefix": "School ID: ",
                        "value": "school_id",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "School Name: ",
                        "value": "school_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "% criteria met: ",
                        "value": "percent_school_met_all_criteria",
                        "valueSuffix": "%\n"
                    },
                    {
                        "valuePrefix": "Toilet: ",
                        "value": "has_toilet",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Playground: ",
                        "value": "has_playground",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Solar Panel: ",
                        "value": "has_solarpanel",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Drinking water: ",
                        "value": "has_water",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Library: ",
                        "value": "has_library",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Handwash: ",
                        "value": "has_handwash",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    school_infra_bignumber: {
        "label": "Average Teachers Reporting Attendance",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber": "select round( (sum(criteria_met)*100)/count(school_id) ) as percent_school_met_criteria FROM (select cctv.school_id,  cctv.academicyear_id,  cctv.sum as has_cctv,  water.sum as has_water,  toilet.sum as has_toilet,  cwsn_toilet.sum as has_cwsn_toilet,  electricity.sum as has_electricity,  library.sum as has_library,  handwash.sum as has_handwash,  solar_panel.sum as has_solarpanel,  playground.sum as has_playground, case when (cctv.sum::int+water.sum::int+toilet.sum::int+cwsn_toilet.sum::int+electricity.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 9 then 1 else 0 end as criteria_met,  school.school_name,  district_name,  block_name,  cluster_name from datasets.school_infra_cctv_school0academicyear as cctv inner join datasets.school_infra_drinkingwater_school0academicyear as water on cctv.school_id = water.school_id and cctv.academicyear_id = water.academicyear_id inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_cwsntoilet_school0academicyear as cwsn_toilet on cwsn_toilet.school_id = water.school_id and cwsn_toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_electricty_school0academicyear as electricity on electricity.school_id = water.school_id and electricity.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = cctv.school_id) as intermediate_table"
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "actions": {
                    "queries": {
                        "bigNumber": "select round( (sum(criteria_met)*100)/count(school_id) ) as percent_school_met_criteria FROM (select cctv.school_id, cctv.academicyear_id, cctv.sum as has_cctv, water.sum as has_water, toilet.sum as has_toilet, cwsn_toilet.sum as has_cwsn_toilet, electricity.sum as has_electricity, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (cctv.sum::int+water.sum::int+toilet.sum::int+cwsn_toilet.sum::int+electricity.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 9 then 1 else 0 end as criteria_met, school.school_name, district_name, district_id, block_name, cluster_name from datasets.school_infra_cctv_anxUZWllQgYCVhMCPgcG as cctv inner join datasets.school_infra_drinkingwater_B2JvNmBoSWx_bmldVWJ7 as water on cctv.school_id = water.school_id and cctv.academicyear_id = water.academicyear_id inner join datasets.school_infra_toilet_fmpgclNmWWBzCR5RPhcO as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_cwsntoilet_MGx_YWJlV3RSbHRoQgwb as cwsn_toilet on cwsn_toilet.school_id = water.school_id and cwsn_toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_electricty_JmF_fGJqRnlSbHRoQgoA as electricity on electricity.school_id = water.school_id and electricity.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_cHVscH9QVW9nex0Nbw0K as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_fmZ7a3FtY2Nob28OM1gA as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_L2N5fmpnV2xSbHRoQhwD as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_IntsfGR8XGRSbHRoQh8A as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = cctv.school_id) as intermediate_table where district_id={district_id}"
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "actions": {
                    "queries": {
                        "bigNumber": "select round((sum(criteria_met)*100)/count(school_id)) as percent_school_met_criteria FROM (select cctv.school_id, cctv.academicyear_id, cctv.sum as has_cctv, water.sum as has_water, toilet.sum as has_toilet, cwsn_toilet.sum as has_cwsn_toilet, electricity.sum as has_electricity, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (cctv.sum::int+water.sum::int+toilet.sum::int+cwsn_toilet.sum::int+electricity.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 9 then 1 else 0 end as criteria_met, school.school_name, district_name, district_id, block_name, block_id, cluster_name from datasets.school_infra_cctv_school0academicyear as cctv inner join datasets.school_infra_drinkingwater_school0academicyear as water on cctv.school_id = water.school_id and cctv.academicyear_id = water.academicyear_id inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_cwsntoilet_school0academicyear as cwsn_toilet on cwsn_toilet.school_id = water.school_id and cwsn_toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_electricty_school0academicyear as electricity on electricity.school_id = water.school_id and electricity.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = cctv.school_id) as intermediate_table where block_id = {block_id}"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "actions": {
                    "queries": {
                        "bigNumber": "select round( (sum(criteria_met)*100)/count(school_id) ) as percent_school_met_criteria FROM (select cctv.school_id, cctv.academicyear_id, cctv.sum as has_cctv, water.sum as has_water, toilet.sum as has_toilet, cwsn_toilet.sum as has_cwsn_toilet, electricity.sum as has_electricity, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (cctv.sum::int+water.sum::int+toilet.sum::int+cwsn_toilet.sum::int+electricity.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 9 then 1 else 0 end as criteria_met, school.school_name, district_name, district_id, block_name, block_id, cluster_name, cluster_id from datasets.school_infra_cctv_school0academicyear as cctv inner join datasets.school_infra_drinkingwater_school0academicyear as water on cctv.school_id = water.school_id and cctv.academicyear_id = water.academicyear_id inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_cwsntoilet_school0academicyear as cwsn_toilet on cwsn_toilet.school_id = water.school_id and cwsn_toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_electricty_school0academicyear as electricity on electricity.school_id = water.school_id and electricity.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = cctv.school_id) as intermediate_table where cluster_id = {cluster_id}"
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "bigNumber": {
                "title": "Schools meeting 100% criteria",
                "valueSuffix": '%',
                "property": 'percent_school_met_criteria'
            }
        }
    }
}

