import {GridColDef, GridRowsProp} from "@mui/x-data-grid";

const bus_rows: GridRowsProp = [
    {id: 1, bus_num: 1, type: 3, mag: 1.0, angle: 0, max: 1, min: 1},
    {id: 2, bus_num: 2, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 3, bus_num: 3, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 4, bus_num: 4, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 5, bus_num: 5, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 6, bus_num: 6, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 7, bus_num: 7, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 8, bus_num: 8, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 9, bus_num: 9, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 10, bus_num: 10, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 11, bus_num: 11, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 12, bus_num: 12, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 13, bus_num: 13, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 14, bus_num: 14, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 15, bus_num: 15, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 16, bus_num: 16, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 17, bus_num: 17, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 18, bus_num: 18, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 19, bus_num: 19, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 20, bus_num: 20, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 21, bus_num: 21, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 22, bus_num: 22, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 23, bus_num: 23, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 24, bus_num: 24, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 25, bus_num: 25, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 26, bus_num: 26, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 27, bus_num: 27, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 28, bus_num: 28, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 29, bus_num: 29, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 30, bus_num: 30, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 31, bus_num: 31, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 32, bus_num: 32, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 33, bus_num: 33, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
];

const bus_columns: GridColDef[] = [
    {field: 'bus_num', headerName: '母线编号', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'type', headerName: '节点类型', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'mag', headerName: '电压幅值', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'angle', headerName: '电压相角', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'max', headerName: '电压最大值', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'min', headerName: '电压最小值', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
];

const branch_rows: GridRowsProp = [
    {id: 1, from: 1, to: 2, r: 0.0922, x: 0.0470, b: 0, S_max: 6, I_max: 10},
    {id: 2, from: 2, to: 3, r: 0.4930, x: 0.2511, b: 0, S_max: 6, I_max: 10},
    {id: 3, from: 3, to: 4, r: 0.3660, x: 0.1864, b: 0, S_max: 6, I_max: 10},
    {id: 4, from: 4, to: 5, r: 0.3811, x: 0.1941, b: 0, S_max: 6, I_max: 10},
    {id: 5, from: 5, to: 6, r: 0.8190, x: 0.7070, b: 0, S_max: 6, I_max: 10},
    {id: 6, from: 6, to: 7, r: 0.1872, x: 0.6188, b: 0, S_max: 4.5, I_max: 10},
    {id: 7, from: 7, to: 8, r: 0.7114, x: 0.2351, b: 0, S_max: 4.5, I_max: 10},
    {id: 8, from: 8, to: 9, r: 1.0300, x: 0.7400, b: 0, S_max: 4.5, I_max: 10},
    {id: 9, from: 9, to: 10, r: 1.0440, x: 0.7400, b: 0, S_max: 4.5, I_max: 10},
    {id: 10, from: 10, to: 11, r: 0.1966, x: 0.0650, b: 0, S_max: 4.5, I_max: 10},
    {id: 11, from: 11, to: 12, r: 0.3744, x: 0.1238, b: 0, S_max: 4.5, I_max: 10},
    {id: 12, from: 12, to: 13, r: 1.4680, x: 1.1550, b: 0, S_max: 4.5, I_max: 10},
    {id: 13, from: 13, to: 14, r: 0.5416, x: 0.7129, b: 0, S_max: 4.5, I_max: 10},
    {id: 14, from: 14, to: 15, r: 0.5910, x: 0.5260, b: 0, S_max: 4.5, I_max: 10},
    {id: 15, from: 15, to: 16, r: 0.7463, x: 0.5450, b: 0, S_max: 4.5, I_max: 10},
    {id: 16, from: 16, to: 17, r: 1.2890, x: 1.7210, b: 0, S_max: 4.5, I_max: 10},
    {id: 17, from: 17, to: 18, r: 0.7320, x: 0.5740, b: 0, S_max: 4.5, I_max: 10},
    {id: 18, from: 2, to: 19, r: 0.1640, x: 0.1565, b: 0, S_max: 4.5, I_max: 10},
    {id: 19, from: 19, to: 20, r: 1.5042, x: 1.3554, b: 0, S_max: 4.5, I_max: 10},
    {id: 20, from: 20, to: 21, r: 0.4095, x: 0.4784, b: 0, S_max: 4.5, I_max: 10},
    {id: 21, from: 21, to: 22, r: 0.7089, x: 0.9373, b: 0, S_max: 4.5, I_max: 10},
    {id: 22, from: 3, to: 23, r: 0.4512, x: 0.3083, b: 0, S_max: 4.5, I_max: 10},
    {id: 23, from: 23, to: 24, r: 0.8980, x: 0.7091, b: 0, S_max: 4.5, I_max: 10},
    {id: 24, from: 24, to: 25, r: 0.8960, x: 0.7011, b: 0, S_max: 4.5, I_max: 10},
    {id: 25, from: 6, to: 26, r: 0.2030, x: 0.1034, b: 0, S_max: 4.5, I_max: 10},
    {id: 26, from: 26, to: 27, r: 0.2842, x: 0.1447, b: 0, S_max: 4.5, I_max: 10},
    {id: 27, from: 27, to: 28, r: 1.0590, x: 0.9337, b: 0, S_max: 4.5, I_max: 10},
    {id: 28, from: 28, to: 29, r: 0.8042, x: 0.7006, b: 0, S_max: 4.5, I_max: 10},
    {id: 29, from: 29, to: 30, r: 0.5075, x: 0.2585, b: 0, S_max: 4.5, I_max: 10},
    {id: 30, from: 30, to: 31, r: 0.9744, x: 0.9630, b: 0, S_max: 4.5, I_max: 10},
    {id: 31, from: 31, to: 32, r: 0.3105, x: 0.3619, b: 0, S_max: 4.5, I_max: 10},
    {id: 32, from: 32, to: 33, r: 0.3410, x: 0.5302, b: 0, S_max: 4.5, I_max: 10},

];

const branch_columns: GridColDef[] = [
    {field: 'from', headerName: '起始节点', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'to', headerName: '终止节点', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'r', headerName: '支路电阻', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'x', headerName: '支路电抗', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'b', headerName: '支路电纳', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'S_max', headerName: '最大容量', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'I_max', headerName: '最大电流', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
];

const gen_rows: GridRowsProp = [
    {id: 1, conn_bus: 4, P_max: 1, P_min: 0, Q_max: 1, Q_min: 0, S: 1.3, SIC: 1, loss: 0.1, a: 20, tu: 8000, CF: 200, eff: 0.9},
];

const gen_columns: GridColDef[] = [
    {field: 'conn_bus', headerName: '相连母线', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_max', headerName: '最大有功', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_min', headerName: '最小有功', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'Q_max', headerName: '最大无功', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'Q_min', headerName: '最小无功', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'S', headerName: '最大容量', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'SIC', headerName: '动态比投资费用', minWidth: 120, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'loss', headerName: '线损率', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'a', headerName: '经济使用寿命', minWidth: 120, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'tu', headerName: '年运行利用小时数', minWidth: 140, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'CF', headerName: '燃料费用', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'eff', headerName: '发电效率', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
];

const solar_rows: GridRowsProp = [
    {id: 1, conn_bus: 4, P_max: 0.09, P_min: 0, n: 0.9, S: 0.1, k: 0.0872, a: 10800, b: 0.05},
    {id: 2, conn_bus: 19, P_max: 0.09, P_min: 0, n: 0.9, S: 0.1, k: 0.0872, a: 10800, b: 0.05},
    {id: 3, conn_bus: 23, P_max: 0.09, P_min: 0, n: 0.9, S: 0.1, k: 0.0872, a: 10800, b: 0.05},
];

const solar_columns: GridColDef[] = [
    {field: 'conn_bus', headerName: '相连母线', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_max', headerName: '最大有功', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_min', headerName: '最小有功', minWidth: 100, headerAlign: 'center',align: 'center', flex: 1},
    {field: 'n', headerName: '功率因数', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'S', headerName: '最大容量', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'k', headerName: '年化率系数', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'a', headerName: '单位容量投资成本', minWidth: 140, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'b', headerName: '发电成本', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
];

const wind_rows: GridRowsProp = [
    {id: 1, conn_bus: 8, P_max: 0.09, P_min: 0, n: 0.9, S: 0.1, k: 0.0872, a: 11520, b: 0.32},
    {id: 2, conn_bus: 14, P_max: 0.09, P_min: 0, n: 0.9, S: 0.1, k: 0.0872, a: 11520, b: 0.32},
    {id: 3, conn_bus: 29, P_max: 0.09, P_min: 0, n: 0.9, S: 0.1, k: 0.0872, a: 11520, b: 0.32},
];

const wind_columns: GridColDef[] = [
    {field: 'conn_bus', headerName: '相连母线', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_max', headerName: '最大有功', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_min', headerName: '最小有功', minWidth: 100, headerAlign: 'center',align: 'center', flex: 1},
    {field: 'n', headerName: '功率因数', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'S', headerName: '最大容量', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'k', headerName: '年化率系数', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'a', headerName: '单位容量投资成本', minWidth: 140, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'b', headerName: '发电成本', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
];

const storage_rows: GridRowsProp = [
    {id: 1, conn_bus: 6, P_out: 0.2, P_in: 0.2, n: 0.9, S: 0.23, a: 13440, b: 0, c: 0}
];

const storage_columns: GridColDef[] = [
    {field: 'conn_bus', headerName: '相连母线', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_out', headerName: '最大输出有功', minWidth: 120, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_in', headerName: '最小输入有功', minWidth: 120, headerAlign: 'center',align: 'center', flex: 1},
    {field: 'n', headerName: '功率因数', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'S', headerName: '最大容量', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'a', headerName: '单位容量投资成本', minWidth: 140, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'b', headerName: '发电成本', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'c', headerName: '运维成本', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
];

const network_name = 'IEEE33';
const gen_num = 1;
const solar_num = 1;
const wind_num = 1;
const storage_num = 1;
const price = [0.3344, 0.3344, 0.3344, 0.3344, 0.3344, 0.3344, 0.3344, 0.5636, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.937975, 1.0373, 1.0373, 1.0373, 1.0373, 1.0373, 1.0373, 1.0373, 0.64, 0.3344];
const solar_irradiance = [0, 0, 0, 0, 0, 0, 0, 0, 0.0469, 0.0875, 0.1700, 0.7477, 0.9890, 1.0000, 0.9023, 0.6751, 0.3489, 0.0241, 0, 0, 0, 0, 0, 0];
const wind_speed = [1.0000, 0.8289, 0.3338, 0.3252, 0.2411, 0, 0.4032, 0.0886, 0, 0, 0, 0, 0.2879, 0.7593, 0.7593, 0.7593, 0.7593, 0.6979, 0.6746, 0.7593, 0.7593, 0.7593, 0.3314, 0.2853];
const pd0 = [0, 100, 90, 120, 60, 60, 200, 200, 60, 60, 45, 60, 60, 120, 60, 60, 60, 90, 90, 90, 90, 90, 90, 420, 420, 60, 60, 60, 120, 200, 150, 210, 60];
const qd0 = [0, 60, 40, 80, 30, 20, 100, 100, 20, 20, 30, 35, 35, 80, 10, 20, 20, 40, 40, 40, 40, 40, 50, 200, 200, 25, 25, 20, 70, 600, 70, 100, 40];

const pd = Array.from({length: 33}, () => [...pd0]);
const qd = Array.from({length: 33}, () => [...qd0]);

const ev_demand = [
    6, 7, 5, 1, 2, 2, 2, 4, 3, 7, 12, 8, 3, 10, 6, 11, 9, 8, 9, 14, 6, 8, 9, 9
];

export const data = {
    bus_rows, bus_columns,
    branch_rows, branch_columns,
    gen_rows, gen_columns,
    solar_rows, solar_columns,
    wind_rows, wind_columns,
    storage_rows, storage_columns,
    network_name,
    gen_num, solar_num, wind_num, storage_num,
    price,
    solar_irradiance, wind_speed,
    pd, qd,
    ev_demand
}