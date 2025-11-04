import {GridColDef} from "@mui/x-data-grid";

const bus_columns: GridColDef[] = [
    {field: 'bus_num', headerName: '母线编号', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'type', headerName: '节点类型', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'mag', headerName: '电压幅值', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'angle', headerName: '电压相角', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'max', headerName: '电压最大值', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'min', headerName: '电压最小值', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
];

const branch_columns: GridColDef[] = [
    {field: 'from', headerName: '起始节点', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'to', headerName: '终止节点', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'r', headerName: '支路电阻', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'x', headerName: '支路电抗', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'b', headerName: '支路电纳', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'I_max', headerName: '最大电流', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
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

const pv_columns: GridColDef[] = [
    {field: 'conn_bus', headerName: '相连母线', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'pf', headerName: '功率因数', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'S', headerName: '最大可配置容量', minWidth: 140, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'k', headerName: '年化率系数', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'a', headerName: '单位容量投资成本', minWidth: 140, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'b', headerName: '发电成本', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'eff', headerName: '发电效率', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
];

const wind_columns: GridColDef[] = [
    {field: 'conn_bus', headerName: '相连母线', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'pf', headerName: '功率因数', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'S', headerName: '最大可配置容量', minWidth: 140, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'k', headerName: '年化率系数', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'a', headerName: '单位容量投资成本', minWidth: 140, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'b', headerName: '发电成本', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'R', headerName: '叶片半径', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'C', headerName: '风能利用系数', minWidth: 120, headerAlign: 'center', align: 'center', flex: 1},
];

const ess_columns: GridColDef[] = [
    {field: 'conn_bus', headerName: '相连母线', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_out', headerName: '最大输出有功', minWidth: 120, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_in', headerName: '最大输入有功', minWidth: 120, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'pf', headerName: '功率因数', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'E', headerName: '最大容量', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'a', headerName: '单位容量投资成本', minWidth: 140, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'b', headerName: '发电成本', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'c', headerName: '运维成本', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
];

export const colDefs = {
    bus_columns,
    branch_columns,
    gen_columns,
    pv_columns,
    wind_columns, ess_columns,
}