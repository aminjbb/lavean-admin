import axios from "axios";
import cookies from 'vue-cookies'
import { gql, graphql } from 'nuxt-graphql-request';


export class AxiosMethods {
    constructor() {
        this.method = ''
        this.endpoint = ''
        this.query = ''
    }
    sendDate(callback) {
        axios({
            method: this.method,
            url: process.env.apiUrl + this.endpoint,
            headers: {
                Authorization: "Bearer " + cookies.get("customer_token"),
            },
            data: this.query
        })
            .then(response => {
                callback(response.data);
            })
            .catch(err => {

            })
    }
}

export class GraphMethod {
    constructor() {
        this.query = ''
    }
    async getWithGraph(callback) {

        var requestHeaders = {
            Authorization: "Bearer " + cookies.get("customer_token"),
        };
        const query = gql`
        query{
         `+ this.query + `
        } `;

        callback(await graphql.default.request(query, {}, requestHeaders))

    }
}



export class PublicMethod {
    constructor() {

    }
    jalaliToGregorian(j_y, j_m, j_d) {
        var JalaliDate = {
            g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
        };
        j_y = parseInt(j_y);
        j_m = parseInt(j_m);
        j_d = parseInt(j_d);
        var jy = j_y - 979;
        var jm = j_m - 1;
        var jd = j_d - 1;

        var j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
        for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

        j_day_no += jd;

        var g_day_no = j_day_no + 79;

        var gy = 1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
        g_day_no = g_day_no % 146097;

        var leap = true;
        if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
            g_day_no--;
            gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
            g_day_no = g_day_no % 36524;

            if (g_day_no >= 365) g_day_no++;
            else leap = false;
        }

        gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
        g_day_no %= 1461;

        if (g_day_no >= 366) {
            leap = false;

            g_day_no--;
            gy += parseInt(g_day_no / 365);
            g_day_no = g_day_no % 365;
        }

        for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap); i++)
            g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
        var gm = i + 1;
        var gd = g_day_no + 1;

        gm = gm < 10 ? "0" + gm : gm;
        gd = gd < 10 ? "0" + gd : gd;
        return gy + '-' + gm + '-' + gd
        // return [gy, gm, gd];
    }

    gregorian_to_jalali(gy, gm, gd) {
        var g_d_m, jy, jm, jd, gy2, days;
        g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        gy2 = (gm > 2) ? (gy + 1) : gy;
        days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
        jy = -1595 + (33 * ~~(days / 12053));
        days %= 12053;
        jy += 4 * ~~(days / 1461);
        days %= 1461;
        if (days > 365) {
            jy += ~~((days - 1) / 365);
            days = (days - 1) % 365;
        }
        if (days < 186) {
            jm = 1 + ~~(days / 31);
            jd = 1 + (days % 31);
        } else {
            jm = 7 + ~~((days - 186) / 30);
            jd = 1 + ((days - 186) % 30);
        }
        return jy + '/' + jm + '/' + jd
    }

    splitChar(text) {
        if (text) {
            return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return 0;
        }
    }
}

export class ProductListFilter {
    constructor() {
        this.min_price = 0;
        this.max_price = 0;
        this.category_url = '';
        this.sort = '';
        this.page = 1;
        this.available = "";
        this.colection = [],
            this.numbers_in_page = 20;
    }

    query_maker() {
        let query = '?'
        if (this.sort) {
            query += "sort=" + this.sort + "&"
        }
        if (this.page) {
            query += "page=" + this.page + "&"
        }
        if (this.category_url) {
            query += "category_url=" + this.category_url + "&"
        }
        if (this.min_price) {
            query += "min_price=" + this.min_price + "&"
        }
        if (this.max_price) {
            query += "max_price=" + this.max_price + "&"
        }
        if (this.available) {
            query += "available=" + this.available + "&"
        }
        if (this.colection.length > 0) {
            var colections = ''
            this.colection.forEach(el => {
                colections += '"' + el + '",'
            })
            query += "colections=" + colections + "&"
        }
        return query.substring(0, query.length - 1)
    }

    query_maker_graph(route) {
        var query = ''
        if (route.query.colections) {
            query += ',collection_Url_In:[' + route.query.colections + ']'
        }
        if (route.query.sort) {
            query += ',sort:"' + route.query.sort + '"'
        }
        if (route.query.max_price) {
            query += ',variants_Price_Lte:' + route.query.max_price
        }
        if (route.query.min_price) {
            query += ',variants_Price_Gte:' + route.query.min_price
        }
        if (route.query.available) {
            query += ',variants_BranchWarehouse_Quantity_Gte:1'
        }
        if (route.query.page) {
            var page = (route.query.page - 1) * 5
            query += ',offset:' + page
        }
        if (route.query.cat) {
       
            query += ',categoryProductAssignments_Category_Id:' + route.query.cat
        }
        return query
    }
}

