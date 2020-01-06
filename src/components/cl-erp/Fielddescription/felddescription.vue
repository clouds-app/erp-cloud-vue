<template>
    <div class="cl-fielddescription">
         <table>
            <tr>
                <th class="one">主要字段</th>
                <th>说明</th>
            </tr>
            <tr>
                <td class="one">流水号规矩</td>
                <td>
                    <ul>
                        <li>{yyyy}{MM}{dd}{NO}</li>
                        <li>{yyyy}:表示年份</li>
                        <li> {MM} :表示月份，如果月份小于10，则加零补齐，如1月份表示为01。</li>
                        <li>{mm} :表示月份，月份不补齐，如1月份表示为1。</li>
                        <li>{DD} :表示日，如果小于10号，则加零补齐，如1号表示为01。</li>
                        <li>{dd} :表示日，日期不补齐，如1号表示为1。</li>
                        <li>{NO} :表示流水号，前面补零。</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td class="one">编码方式</td>
                <td>
                    <ul>
                        <li>1.流水顺序，流水号一直增加。</li>
                        <li>2.按年复位，流水号按年复位。</li>
                        <li>2.按年复位，流水号按年复位。</li>
                        <li>2.按年复位，流水号按年复位。</li>

                    </ul>
                </td>
            </tr>
            <tr>
                <td class="one">流水号长度</td>
                <td>
                    <ul>
                        <li>这个长度表示当前流水号的长度数，只包括流水号部分{NO},如果长度为5，当前流水号为5，则在流水号前补4个0，表示为00005。
                            {no}如果长度为5，当前流水号为501，则在流水号后面补5个0，表示为50100000，如果长度为1，则流水号一直递增。
                            初始值
                            </li>
                        <li>这个初始值表示流水号部分{NO}的初始值。如 2015102700001,初始值为1，则流水号部分的初始值为00001
                            步长
                            </li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td class="one">步长</td>
                <td>
                    <ul>
                        <li>流水号每次递加的数字，默认步长为1。比如步长为2，则每次获取流水号则在原来的基础上加2。</li>
                    </ul>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {

}
</script>
<style>
.cl-fielddescription{
    font-size: 13px;
}
.cl-fielddescription .one{
    width: 100px;
}
.cl-fielddescription td {
    border:2px #EDEDED solid;
}
.cl-fielddescription li{
    margin-left: 20px;
}
.cl-fielddescription table{
    border-collapse:collapse;
    height: 300px;
}
.cl-fielddescription th{
    background: rgba(250, 250, 250, 0.767);
    height: 20px;
}
</style>
