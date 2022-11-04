<template>
    <section class="main-content">
        <div class="header-container">
            <div><q-btn unelevated outline color="primary" size="md" label="新增" @click="add()"/></div>
            <div class="row justify-start items-center">
                <div class="input-container">
                    <q-input outlined  v-model="search" placeholder="请输入应用英文标识符" size="md" v-on:keyup.enter="onQueryClickAction" >
                        <template v-slot:prepend>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </div>
                <div class="q-px-md">
                    <q-btn unelevated no-caps color="primary" label="查询" size="md" @click="onQueryClickAction"/>
                </div>
                <div class="q-px-md">
                    <q-btn unelevated outline color="primary" label="高级搜索" size="md" @click="searchEv()"/>
                </div>
            </div>
        </div>
        <div class="table-container">
            <q-table
                :rows="rows"
                :columns="columns"
                row-key="id"
                :loading="loading"
                flat>
                <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="name" :props="props">
                        <span>{{ props.row.name }}</span>
                    </q-td>
                    <q-td key="calories" :props="props">
                        <span>{{ props.row.calories }}</span>
                    </q-td>
                    <q-td key="pluralName" :props="props">
                        <span>{{ props.row.pluralName }}</span>
                    </q-td>
                    <q-td key="fat" :props="props">
                        <span>{{ props.row.fat }}</span>
                    </q-td>
                    <q-td key="carbs" :props="props">
                        <span>{{ props.row.carbs }}</span>
                    </q-td>
                    <q-td key="protein" :props="props">
                        <span>{{ props.row.protein  }}</span>
                    </q-td>
                    <q-td key="sodium" :props="props">
                        <span>{{ props.row.sodium }}</span>
                    </q-td>
                    <q-td key="calcium" :props="props">
                        <span style="color:#67c23a">{{ props.row.calcium }}</span>
                    </q-td>
                    <q-td key="iron" :props="props">
                        <span>{{ props.row.iron }}</span>
                    </q-td>
                    <q-td key="dataClickAction" :props="props">
                        <q-icon name="launch" style="color:#1976D2"/>
                        <q-btn
                        unelevated
                        @click="add()"
                        color="primary"
                        label="编辑"
                        flat
                        dense
                        ></q-btn>
                        <q-icon name="visibility" style="color:#1976D2"/>
                        <q-btn
                        unelevated
                        @click="add()"
                        color="primary"
                        label="详情"
                        flat
                        dense
                        ></q-btn>
                        <q-icon name="block" style="color:#C10015"/>
                        <q-btn
                            unelevated
                            @click="disabledBtn(props.row.id)"
                            color="negative"
                            label="禁用"
                            flat
                            dense
                        ></q-btn>
                    </q-td>
                </q-tr>
                </template>
            </q-table>
        </div>
    </section>
    <!-- 高级搜索弹框 -->
    <q-dialog v-model="searchDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section align="center">
          <q-toolbar-title>搜索</q-toolbar-title>
          <q-separator />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md q-pb-md">
            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right text-subtitle2 q-pr-md">应用英文标识:</div>
              <q-input
                  outlined
                  dense
                  class="col-7"
                  v-model="searchForm.name"
                />
            </div>

            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right text-subtitle2 q-pr-md">应用名称:</div>
              <q-input
                  outlined
                  dense
                  class="col-7"
                  v-model="searchForm.name"
                />
            </div>
            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right text-subtitle2 q-pr-md">应用地址:</div>
              <q-input
                  outlined
                  dense
                  class="col-7"
                  v-model="searchForm.name"
                />
            </div>
            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right text-subtitle2 q-pr-md">状态:</div>
              <q-btn-toggle
                  v-model="searchForm.status"
                  toggle-color="primary"
                  dense
                  padding="5px 10px"
                  :options="[
                    {label: '禁用', value: 'one'},
                    {label: '启用', value: 'two'},
                  ]"
                />
            </div>
            <q-card-actions align="center">
              <q-btn color="primary" label="查询" v-close-popup/>
              <q-btn outline color="primary" label="重置" v-close-popup/>
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- 新增弹框 -->
    <q-dialog v-model="addDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section align="center">
          <q-toolbar-title>新增</q-toolbar-title>
          <q-separator />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md q-pb-md">
            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right required text-subtitle2 q-pr-md">应用英文标识:</div>
              <q-input
                  outlined
                  dense
                  class="col-7"
                  placeholder="请输入序号编码，如productCode"
                  ref="form.name"
                  v-model="form.name"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || '不能为空']"
                />
            </div>

            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right required text-subtitle2 q-pr-md">应用名称:</div>
              <q-input
                  outlined
                  dense
                  class="col-7"
                  placeholder="请输入序号名称，如产品code流水号"
                  ref="form.name"
                  v-model="form.name"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || '不能为空']"
                />
            </div>
            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right required text-subtitle2 q-pr-md">应用地址:</div>
              <q-input
                  outlined
                  dense
                  class="col-7"
                  placeholder="请输入序号名称，如产品code流水号"
                  ref="form.name"
                  v-model="form.name"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || '不能为空']"
                />
            </div>
            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right required text-subtitle2 q-pr-md">通知提醒渠道:</div>
              <q-input
                  outlined
                  dense
                  readonly
                  class="col-7"
                  v-model="form.message"
                  @click="msgEv"
                  />
                </div>
                <div class="row items-baseline content-center justify-start">
                  <div class="col-3 text-right required text-subtitle2 q-pr-md">服务请求接口:</div>
                  <q-input
                  outlined
                  dense
                  readonly 
                  class="col-7"
                  v-model="form.apiRes"
                  @click="msgEv"
                />
            </div>
            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right text-subtitle2 q-pr-md">应用备注:</div>
              <q-input
                  outlined
                  dense
                  class="col-7"
                  ref="form.mask"
                  v-model="form.mask"
                  type="textarea"
                />
            </div>

            <!-- <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right required text-subtitle2 q-pr-md">类型:</div>
              <q-select
                  dense
                  class="col-7"
                  outlined
                  v-model="form.name"
                  :options="form.name"
                  emit-value
                  map-options
                />
            </div> -->
          </q-form>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn color="primary" label="确定" @click="onSubmit"/>
          <q-btn outline color="primary" label="取消" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- 消息通知提醒弹框 -->
    <q-dialog v-model="msgDialog" persistent>
      <q-card style="width: 900px; max-width: 80vw;">
        <q-card-section align="center">
          <q-toolbar-title>通知提醒渠道</q-toolbar-title>
          <q-separator />
        </q-card-section>
        <q-card-section align="right" style="padding:0 15px 5px">
          <q-btn unelevated outline color="primary" size="md" label="新增" @click="msgAdd()"/>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-table
            :rows="msgRows"
            :columns="msgColumns"
            row-key="id"
            hide-bottom
            flat
            bordered>
              <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="name" :props="props">
                        <q-input
                          outlined
                          dense
                          disable
                          v-model="props.row.name"
                        />
                    </q-td>
                    <q-td key="address" :props="props">
                      <q-input
                          outlined
                          dense
                          v-model="props.row.address"
                        />
                    </q-td>
                    <q-td key="remark" :props="props">
                      <q-input
                          outlined
                          dense
                          v-model="props.row.remark"
                        />
                    </q-td>
                    <q-td key="dataClickAction" :props="props" v-if="props.row.id>0">
                        <q-icon name="delete" style="color:#C10015"/>
                        <q-btn
                            unelevated
                            @click="delBtn(props.row,index)"
                            color="negative"
                            label="删除"
                            flat
                            dense
                        ></q-btn>
                    </q-td>
                </q-tr>
              </template>
            </q-table>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="primary" label="确定" v-close-popup/>
          <q-btn outline color="primary" label="取消" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import { ref,reactive, toRefs} from 'vue'
import { useQuasar } from 'quasar'

const formDialog= ref('formDialog')
const state = reactive({
    columns : [
        {
            name: 'name',
            required: true,
            label: '应用英文标识',
            align: 'center',
            field: row => row.name,
            format: val => `${val}`,
        },
        { name: 'calories', align: 'center', label: '应用名称', field: 'calories', sortable: true },
        { name: 'fat', align: 'center',label: '通知提醒渠道', field: 'fat', sortable: true },
        { name: 'carbs',align: 'center', label: '服务请求接口', field: 'carbs' },
        { name: 'protein',align: 'center', label: '应用地址', field: 'protein' },
        { name: 'sodium', align: 'center',label: '应用备注', field: 'sodium' },
        { name: 'calcium',align: 'center', label: '状态', field: 'calcium'},
        { name: 'iron',align: 'center', label: '操作', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        {
          name: "dataClickAction",
          align: "center",
          label: "操作",
          field: "dataClickAction",
          sortable: true
        },
    ],
    rows:[{
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '启用',
            iron: '1%'
        },
        {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '启用',
            iron: '1%'
        },
        {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '启用',
            iron: '7%'
        },
        {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '启用',
            iron: '8%'
    }],
    searchDialog:false,
    addDialog:false,
    form:{
      name:null,
      age:null,
      accept:false,
      message:'平台消息提醒',
      apiRes:'表单编辑,部门信息,角色信息,任务处理人,用户信息',
      mask:''
    },
    searchForm:{
      name:null,
      age:null,
      accept:false,
      status:null
    },
    msgDialog:false,
    msgForm:{
      name:null,
      age:null,
      accept:false,
      status:null
    },
    msgColumns : [
        {
            name: 'name',
            required: true,
            label: '消息名称',
            align: 'center',
            field: row => row.name,
            format: val => `${val}`,
        },
        { name: 'address', align: 'center', label: '消息发送地址', field: 'calories' },
        { name: 'remark', align: 'center',label: '备注', field: 'fat' },
        {
          name: "dataClickAction",
          align: "center",
          label: "操作",
          field: "dataClickAction"
        },
    ],
    msgRows:[{
        id:0,
        name: '平台消息提醒',
        address: 'http://127.0.0.1:8080/autumn-admin/v1/pfnewss/insertMsg',
        remark:'平台消息提醒'
      }
    ],
})

const { columns,rows,form,searchForm,addDialog,searchDialog,msgDialog,msgColumns,msgRows } = toRefs(state)

// 新增
const add = () => {
  addDialog.value = true
}
// 高级查询
const searchEv = () => {
  searchDialog.value = true
}
// 消息提醒弹框
const msgEv = () => {
  msgDialog.value = true
}
//  消息提醒弹框-新增
const msgAdd = () => {
  console.log('111-------->',msgRows.value.length)
  const obj = {
    id:msgRows.value.length,
    name: '平台消息提醒',
    address: '',
    remark:''
  }
  msgRows.value.push(obj)
}
//  消息提醒弹框-删除
const delBtn = (rows) => {
  msgRows.value.splice(rows.id, 1)
}
const $q = useQuasar()
const disabledBtn = () => {
    $q.dialog({
        title: '提示',
        message: '禁用该列表数据，是否继续?',
        ok: {
          color: "negative",
          label:'确定',
          unelevated: true
        },
        cancel: {
          label:'取消',
          unelevated: true
        },
        persistent: false
      }).onOk(() => {
        $q.notify({
          message: '禁用成功!',
          position:'top'
        });
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
}

//  新增校验确认
const onSubmit =  () => {
  if (form.accept !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first'
    })
  }
  else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
  }
}
</script>

<style lang="scss" scoped>
.required:before {
  content: "* ";
  color: red;
}
.main-content{
    box-sizing: border-box;
    padding:15px 20px;
}
.header-container{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-bottom:20px;
    .input-container{
        .q-field{
            :deep(.q-field__control){
                height:38px;
                >.q-field__prepend{
                    height:38px;
                }
            }
            
        }
        
    }
}
  .q-table__top,
  :deep(thead tr:first-child th){
    /* bg color is important for th; just specify one */
    background-color: #f0efef
  }
</style>