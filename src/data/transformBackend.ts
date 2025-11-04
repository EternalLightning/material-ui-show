// 新增：后端 JSON -> 前端 data 格式的转换器
// 说明：该文件导出一个函数 transformBackendToFrontend(backend:any) -> data object

export function transformBackendToFrontend(backend: any) {
    if (!backend || typeof backend !== 'object') return {};

    // data.json 中 bus/branch/gen/pv/wind/ess 都是对象数组，字段名也为键
    const bus_rows = (backend.bus || []).map((b: any) => {
        // 支持 b 既可能是对象也可能是数组
        if (Array.isArray(b)) {
            const [bus_num, type, mag, angle, max, min] = b;
            return {id: bus_num, bus_num, type, mag, angle, max, min};
        }
        const bus_num = b.bus_num ?? b.id;
        return {
            id: bus_num,
            bus_num,
            type: b.type ?? null,
            mag: b.mag ?? null,
            angle: b.angle ?? null,
            max: b.max ?? null,
            min: b.min ?? null,
        };
    });

    const branch_rows = (backend.branch || []).map((br: any, idx: number) => {
        if (Array.isArray(br)) {
            const [from, to, r, x, b_val, I_max] = br;
            return {id: idx + 1, from, to, r, x, b: b_val, I_max: I_max ?? 10};
        }
        return {
            id: br.id ?? (idx + 1),
            from: br.from,
            to: br.to,
            r: br.r ?? br.resistance ?? null,
            x: br.x ?? br.reactance ?? null,
            b: br.b ?? null,
            I_max: br.I_max ?? br.Imax ?? 10,
        };
    });

    const gen_rows = (backend.gen || []).map((g: any, idx: number) => {
        if (Array.isArray(g)) {
            const [conn_bus, P_max, P_min, Q_max, Q_min, S, SIC, loss, a, tu, CF, eff] = g;
            return {id: idx + 1, conn_bus, P_max, P_min, Q_max, Q_min, S, SIC, loss, a, tu, CF, eff};
        }
        return {
            id: g.id ?? (idx + 1),
            conn_bus: g.conn_bus ?? g.bus ?? null,
            P_max: g.P_max ?? g.Pmax ?? null,
            P_min: g.P_min ?? g.Pmin ?? 0,
            Q_max: g.Q_max ?? null,
            Q_min: g.Q_min ?? null,
            S: g.S ?? null,
            SIC: g.SIC ?? null,
            loss: g.loss ?? null,
            a: g.a ?? null,
            tu: g.tu ?? null,
            CF: g.CF ?? null,
            eff: g.eff ?? null,
        };
    });

    // PV rows should match data_col_def: pf, S, k, a, b, eff
    const pv_rows = (backend.pv || backend.solar || []).map((p: any, idx: number) => {
        if (Array.isArray(p)) {
            const [conn_bus, pf, S, k, a, b, eff] = p;
            return {
                id: idx + 1,
                conn_bus,
                pf: pf ?? null,
                S: S ?? null,
                k: k ?? null,
                a: a ?? null,
                b: b ?? null,
                eff: eff ?? null
            };
        }
        return {
            id: p.id ?? (idx + 1),
            conn_bus: p.conn_bus ?? p.bus ?? null,
            pf: p.pf ?? p.n ?? null,
            S: p.S ?? p.P_max ?? null,
            k: p.k ?? null,
            a: p.a ?? null,
            b: p.b ?? null,
            eff: p.eff ?? null,
        };
    });

    // Wind rows should match data_col_def: pf, S, k, a, b, R, C
    const wind_rows = (backend.wind || []).map((w: any, idx: number) => {
        if (Array.isArray(w)) {
            const [conn_bus, pf, S, k, a, b, R, C] = w;
            return {
                id: idx + 1,
                conn_bus,
                pf: pf ?? null,
                S: S ?? null,
                k: k ?? null,
                a: a ?? null,
                b: b ?? null,
                R: R ?? null,
                C: C ?? null
            };
        }
        return {
            id: w.id ?? (idx + 1),
            conn_bus: w.conn_bus ?? w.bus ?? null,
            pf: w.pf ?? w.n ?? null,
            S: w.S ?? w.P_max ?? null,
            k: w.k ?? null,
            a: w.a ?? null,
            b: w.b ?? null,
            R: w.R ?? null,
            C: w.C ?? null,
        };
    });

    // ESS rows should match data_col_def: P_out, P_in, pf, E (max capacity), a, b, c
    const ess_rows = (backend.ess || backend.storage || []).map((s: any, idx: number) => {
        if (Array.isArray(s)) {
            const [conn_bus, P_out, P_in, pf, E, a, b, c] = s;
            return {
                id: idx + 1,
                conn_bus,
                P_out: P_out ?? null,
                P_in: P_in ?? null,
                pf: pf ?? null,
                E: E ?? null,
                a: a ?? null,
                b: b ?? null,
                c: c ?? null
            };
        }
        return {
            id: s.id ?? (idx + 1),
            conn_bus: s.conn_bus ?? s.bus ?? null,
            P_out: s.P_out ?? null,
            P_in: s.P_in ?? null,
            pf: s.pf ?? s.n ?? null,
            E: s.E ?? s.S ?? null,
            a: s.a ?? null,
            b: s.b ?? null,
            c: s.c ?? null,
        };
    });

    const price = Array.isArray(backend.price) ? backend.price.map(Number) : [];

    const solar_irradiance = Array.isArray(backend.solar_irradiance) ? backend.solar_irradiance.map(Number) : [];
    const wind_speed = Array.isArray(backend.wind_speed) ? backend.wind_speed.map(Number) : [];

    const pd = Array.isArray(backend.pd) ? (backend.pd.map((row: any) => Array.isArray(row) ? row.map(Number) : [])) : [];
    const qd = Array.isArray(backend.qd) ? backend.qd : pd;

    const ev_demand = Array.isArray(backend.ev_demand) ? backend.ev_demand.map(Number) : (Array.isArray(backend.ev) ? backend.ev.map(Number) : []);

    const network_name = backend.name ?? backend.network_name ?? backend.network ?? 'NETWORK';

    const gen_num = backend.gen_num ?? (Array.isArray(backend.gen) ? backend.gen.length : gen_rows.length);
    const pv_num = backend.pv_num ?? backend.solar_num ?? (Array.isArray(backend.pv) ? backend.pv.length : pv_rows.length);
    const wind_num = backend.wind_num ?? (Array.isArray(backend.wind) ? backend.wind.length : wind_rows.length);
    const ess_num = backend.ess_num ?? (Array.isArray(backend.ess) ? backend.ess.length : ess_rows.length);

    return {
        bus_rows,
        branch_rows,
        gen_rows,
        pv_rows,
        wind_rows,
        ess_rows,
        network_name,
        gen_num,
        pv_num,
        wind_num,
        ess_num,
        price,
        solar_irradiance,
        wind_speed,
        pd,
        qd,
        ev_demand,
    };
}
