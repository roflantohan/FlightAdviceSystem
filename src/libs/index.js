import AIR_DATA from './constants'
import moment from 'moment'

const createSelectOptions = (arrOptions) => {
    return arrOptions.map(option => {
        return { value: option, label: option }
    })
}

const radToDegree = (rad) => (rad * 180) / Math.PI
const degreeToRad = (degree) => (degree * Math.PI) / 180;
const nodeToSpeed = (node) => node * 0.514444;
const ftToKm = (ft) => ft/3280.84;

const getAzimut = (vector) => {
    const dx = vector.xy1.latitude - vector.xy2.latitude;
    const dy = vector.xy1.longitude - vector.xy2.longitude;
    const dist = Math.sqrt((dx*dx)+(dy*dy));
    const dxa = Math.abs(dx);
    const beta = radToDegree(Math.cos((dxa/dist)));
    if(dx > 0){
        if(dy < 0){
            return 270 + beta;
        }else{
            return 270 - beta;
        }
    }else{
        if(dy < 0){
            return 90 - beta;
        }else{
            return 90 + beta;
        }
    }
}

const getTimeByFuncLat = (vector) => {
    return (vector.xy2.latitude - vector.xy1.latitude)/latSpeed(vector) + vector.t1;
}

const getTimeInPoint = (vector, point) => {
    return (point.latitude - vector.xy1.latitude)/latSpeed(vector) + vector.t1;
}

const funcLat = (vector, t) => {
    return vector.xy1.latitude + t * latSpeed(vector)
}

const funcLon = (vector, t) => {
    return vector.xy1.longitude + t * lonSpeed(vector)
}

const latSpeed = vector => {
    return vector.speed/111132.954;
}

const lonSpeed = vector => {
    return vector.speed/(111132.954*Math.cos(degreeToRad(vector.xy1.latitude)))
}

const getDisntance = vector => {
    return AIR_DATA.RADIUS_EARTH*Math.acos(Math.sin(degreeToRad(vector.xy1.latitude))*Math.sin(degreeToRad(vector.xy2.latitude)) + Math.cos(degreeToRad(vector.xy1.latitude))*Math.cos(degreeToRad(vector.xy2.latitude))*Math.cos(degreeToRad(vector.xy2.longitude)-degreeToRad(vector.xy1.longitude)));
}

const getAbsoluteDatetime = (vector, t) => {
    const fullDate = moment(`${vector.date} ${vector.time}`)
    fullDate.add(t, 'seconds')
    return fullDate;
}



const createVectors = (fp) => {
    const vectors = []
    let t1 = 0;
    for(let i = 0; i < fp.R.length; i++){
        if(i == fp.R.length - 2) break;
        const A = fp.R[i]
        const B = fp.R[i+1]

        const vector = {
            A,
            xy1: AIR_DATA.COORDINATES_POINTS[A],
            t1,
            B,
            xy2: AIR_DATA.COORDINATES_POINTS[B],
            speed: fp.CS,
            high: fp.LVL,
            time: moment(fp.ST).format("hh:mm:ss"),
            date: moment(fp.SD).format("YYYY.MM.DD"),
        }

        const t2 = getTimeByFuncLat(vector, t1)
        vector.t2 = t2;
        const azimut = getAzimut(vector)
        vector.azimut = azimut;
        const distance = getDisntance(vector);
        vector.distance = distance;

        vectors.push(vector)

        t1 = t2
    }

    return vectors
}

const firstConditionConflict = (otherV, myV) => {
    if(otherV.A === myV.A) return myV.A;

    if(otherV.A === myV.B) return myV.B;

    if(otherV.B === myV.A) return myV.A;

    if(otherV.B === myV.B) return myV.B;

    return false;
}

const secondConditionConflict = (otherV, myV) => {
    function orientation(p, q, r) {
        const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
        if (val === 0) {
            return 0;
        }
        return val > 0 ? 1 : -1;
    }
    
    function onSegment(p, q, r) {
        return (
            q[0] <= Math.max(p[0], r[0]) &&
            q[0] >= Math.min(p[0], r[0]) &&
            q[1] <= Math.max(p[1], r[1]) &&
            q[1] >= Math.min(p[1], r[1])
        );
    }
    
    function doIntersect(p1, q1, p2, q2) {
        const o1 = orientation(p1, q1, p2);
        const o2 = orientation(p1, q1, q2);
        const o3 = orientation(p2, q2, p1);
        const o4 = orientation(p2, q2, q1);
    
        if (o1 !== o2 && o3 !== o4) {
            return true;
        }
    
        if (o1 === 0 && onSegment(p1, p2, q1)) {
            return true;
        }
        if (o2 === 0 && onSegment(p1, q2, q1)) {
            return true;
        }
        if (o3 === 0 && onSegment(p2, p1, q2)) {
            return true;
        }
        if (o4 === 0 && onSegment(p2, q1, q2)) {
            return true;
        }
    
        return false;
    }
    
    const p1 = [otherV.xy1.latitude, otherV.xy1.longitude];
    const q1 = [otherV.xy2.latitude, otherV.xy2.longitude];
    const p2 = [myV.xy1.latitude, myV.xy1.longitude];
    const q2 = [myV.xy2.latitude, myV.xy2.longitude];
    
    const intersect = doIntersect(p1, q1, p2, q2);

    return intersect;
}

const getPointConflict = (otherV, myV) => {
    let n;
    const x1 = otherV.xy1.latitude;
    const y1 = otherV.xy1.longitude;
    const x2 = otherV.xy2.latitude;
    const y2 = otherV.xy2.longitude;
    const x3 = myV.xy1.latitude;
    const y3 = myV.xy1.longitude;
    const x4 = myV.xy2.latitude;
    const y4 = myV.xy2.longitude;

    if(y2 - y1 != 0){
        const q = (x2 - x1) / (y1 - y2);
        const sn = (x3 - x4) + (y3 - y4) * q;
        if(!sn) return null;
        const fn = (x3 - x1) + (y3 - y1) * q;
        n = fn / sn;
    }
    else{
        if(!(y3-y4)){
            return null
        }
        n = (y3-y1) / (y3-y4)
    }

    return {latitude: x3 + (x4 - x3)*n, longitude: y3 + (y4 - y3) * n};
}

const searchConfilct = (othersFP, myFP) => {
    const conflicts = []
    const myRoute = createVectors(myFP);
    
    for(let i = 0; i < othersFP.length; i++){
        const otherRoute = createVectors(othersFP[i]);
        for(let j = 0; j < otherRoute.length; j++){
            for(let h = 0; h < myRoute.length; h++){
                const oneFlag = firstConditionConflict(otherRoute[j], myRoute[h])
                if(oneFlag !== false){

                    let time1;
                    let time2;
                    if(otherRoute[j].A === oneFlag){
                        time1 = getAbsoluteDatetime(otherRoute[j], otherRoute[j].t1);
                    }else{
                        time1 = getAbsoluteDatetime(otherRoute[j], otherRoute[j].t2);
                    }

                    if(myRoute[h].A === oneFlag){
                        time2 = getAbsoluteDatetime(myRoute[h], myRoute[h].t1);
                    }else{
                        time2 = getAbsoluteDatetime(myRoute[h], myRoute[h].t2);
                    }

                    const timeDiff = time1 > time2 ? time1 - time2 : time2 - time1
                    if(timeDiff <= AIR_DATA.MIN_TIMEOUT){
                        if(Math.abs(otherRoute[j].high - myRoute[h].high) <= 10){
                            if(myRoute[h].A === oneFlag){
                                conflicts.push(myRoute[h].xy1)
                            }else{
                                conflicts.push(myRoute[h].xy2)
                            }

                            return conflicts
                        }
                    }
                }
                const secondFlag = secondConditionConflict(otherRoute[j], myRoute[h])
                if(secondFlag !== false){
                    const dot = getPointConflict(otherRoute[j], myRoute[h])
                    if(dot){
                        const timeAlt1 = getTimeInPoint(otherRoute[j], dot)
                        const timeAlt2 = getTimeInPoint(myRoute[h], dot)
                        const time1 = getAbsoluteDatetime(otherRoute[j], timeAlt1);
                        const time2 = getAbsoluteDatetime(myRoute[h], timeAlt2);

                        const timeDiff = time1 > time2 ? time1 - time2 : time2 - time1

                        if(timeDiff <= AIR_DATA.MIN_TIMEOUT){
                            if(Math.abs(otherRoute[j].high - myRoute[h].high) <= 10){
                                conflicts.push(dot)
                                return conflicts
                            }
                        }
    
                    }
                    
                    
                }
            }

        }
    }

    return conflicts
}


export {
    createSelectOptions,
    searchConfilct
}
