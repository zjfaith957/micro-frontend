<template>
    <section class="main-content">
        <div class="header-container">
            <div>
              <q-btn unelevated outline icon="add" color="primary" size="md" label="新增" @click="add()"/>
              <q-btn unelevated outline icon="vertical_align_top" color="primary" size="md" label="导入"/>
              <q-btn unelevated outline icon="vertical_align_bottom" color="primary" size="md" label="导出"/>
            </div>
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
                    <q-td key="application" :props="props">
                        <span>{{ props.row.application }}</span>
                    </q-td>
                    <q-td key="calories" :props="props">
                        <span>{{ props.row.calories }}</span>
                    </q-td>
                    <q-td key="fat" :props="props">
                        <span>{{ props.row.fat }}</span>
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
                            label="删除"
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
      <q-card style="width: 600px; max-width: 80vw;">
        <q-card-section align="center">
          <q-toolbar-title>搜索</q-toolbar-title>
          <q-separator />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md q-pb-md">
            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right text-subtitle2 q-pr-md">应用:</div>
              <q-select
                  dense
                  class="col-7"
                  outlined
                  v-model="form.name"
                  :options="['公共组合']"
                  emit-value
                  map-options
                />
            </div>
            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right text-subtitle2 q-pr-md">业务主体名称:</div>
              <q-input
                  outlined
                  dense
                  class="col-7"
                  v-model="searchForm.name"
                />
            </div>
            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right text-subtitle2 q-pr-md">业务主体英文名:</div>
              <q-input
                  outlined
                  dense
                  class="col-7"
                  v-model="searchForm.name"
                />
            </div>
            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right text-subtitle2 q-pr-md">是否可编辑:</div>
              <q-select
                  dense
                  class="col-7"
                  outlined
                  v-model="form.status"
                  :options="['是','否']"
                  emit-value
                  map-options
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
      <q-card style="width: 900px; max-width: 80vw;">
        <q-card-section align="center">
          <q-toolbar-title>新增</q-toolbar-title>
          <q-separator />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md q-pb-md">
            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right text-subtitle2 q-pr-md">应用:</div>
              <q-select
                  dense
                  class="col-7"
                  outlined
                  v-model="form.application"
                  :options="['公共组合']"
                  emit-value
                  map-options
                />
            </div>
            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right required text-subtitle2 q-pr-md">业务主体名称:</div>
              <q-input
                  outlined
                  dense
                  class="col-7"
                  ref="form.name"
                  v-model="form.name"
                  lazy-rules
                />
            </div>
            <div class="row items-baseline content-center justify-start">
              <div class="col-3 text-right required text-subtitle2 q-pr-md">业务主体英文名称:</div>
              <q-input
                  outlined
                  dense
                  class="col-7"
                  ref="form.name"
                  v-model="form.name"
                  lazy-rules
                />
            </div>
          </q-form>
          <div>
            <q-btn unelevated  color="primary" size="md" label="维护表字段" @click="msgEv"/>
            <q-btn unelevated outline color="primary" size="md" label="添加子表" @click="msgEv"/>
          </div>
        </q-card-section>
        <q-table
              :rows="subRows"
              :columns="subColumns"
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
                  <q-td key="fat" :props="props">
                      <span>{{ props.row.fat }}</span>
                  </q-td>
                  <q-td key="carbs" :props="props">
                        <span>{{ props.row.carbs }}</span>
                    </q-td>
                  <q-td key="protein" :props="props">
                      <span>{{ props.row.protein }}</span>
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
                      <q-icon name="block" style="color:#C10015"/>
                      <q-btn
                          unelevated
                          @click="disabledBtn(props.row.id)"
                          color="negative"
                          label="删除"
                          flat
                          dense
                      ></q-btn>
                  </q-td>
              </q-tr>
              </template>
          </q-table>
        <q-card-actions align="center">
          <q-btn color="primary" label="确定" @click="onSubmit"/>
          <q-btn outline color="primary" label="取消" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- 维护表字段弹框 -->
    <q-dialog v-model="subDialog" persistent>
      <q-card style="width: 900px; max-width: 80vw;">
        <q-card-section align="center">
          <q-toolbar-title>子表</q-toolbar-title>
          <q-separator />
        </q-card-section>
        <q-card-section align="right" style="padding:0 15px 5px">
          <q-btn unelevated outline color="primary" size="md" label="添加字段" @click="msgAdd()"/>
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
            name: 'application',
            required: true,
            label: '应用',
            align: 'center',
            field: row => row.name,
            format: val => `${val}`,
        },
        { name: 'calories', align: 'center', label: '业务主体名称', field: 'calories', sortable: true },
        { name: 'fat', align: 'center',label: '业务主体英文名', field: 'fat', sortable: true },
        {
          name: "dataClickAction",
          align: "center",
          label: "操作",
          field: "dataClickAction",
          sortable: true
        },
    ],
    rows:[
      {
        application: '公共组合',
        calories: '复杂页测试1',
        fat: 'BUSI_M_SYSTEM_CCKAC_FZYCSS',
      },
      {
        application: '公共组合',
        calories: '复杂页测试2',
        fat: 'BUSI_M_SYSTEM_CCKAC_FZYCSS',
      },
      {
        application: '公共组合',
        calories: '复杂页测试3',
        fat: 'BUSI_M_SYSTEM_CCKAC_FZYCSS',
      },
      {
        application: '公共组合',
        calories: '复杂页测试4',
        fat: 'BUSI_M_SYSTEM_CCKAC_FZYCSS',
      },
      {
        application: '公共组合',
        calories: '复杂页测试三',
        fat: 'BUSI_M_SYSTEM_CCKAC_FZYCSS',
      },
      {
        application: '公共组合',
        calories: '复杂页测试三',
        fat: 'BUSI_M_SYSTEM_CCKAC_FZYCSS',
      },
    ],
    subColumns : [
        {
            name: 'name',
            required: true,
            label: '子表中文名',
            align: 'center',
            field: row => row.name,
            format: val => `${val}`,
        },
        { name: 'calories', align: 'center', label: '子表名', field: 'calories', sortable: true },
        { name: 'fat', align: 'center',label: '主表关联字段', field: 'fat', sortable: true },
        { name: 'carbs',align: 'center', label: '子表关联字段', field: 'carbs' },
        { name: 'protein',align: 'center', label: '子表/明细表', field: 'protein' },
        {
          name: "dataClickAction",
          align: "center",
          label: "操作",
          field: "dataClickAction",
          sortable: true
        },
    ],
    subRows:[
      {
          name: '明细表名称',
          calories: 'BUSI_S_SYSTEM_CCKAB_MXBMC',
          fat: 'BUSI_ID',
          carbs: 'BUSI_ID',
          protein: '明细表',
      },
      {
          name: '明细表名称',
          calories: 'BUSI_S_SYSTEM_CCKAB_MXBMC',
          fat: 'BUSI_ID',
          carbs: 'BUSI_ID',
          protein: '明细表',
      },
    ],
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
    subDialog:false,
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

const { columns,rows,form,searchForm,addDialog,searchDialog,subColumns,subDialog,msgColumns,subRows,msgRows } = toRefs(state)

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
  subDialog.value = true
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
        message: '删除该列表数据，是否继续?',
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
          message: '删除成功!',
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
    div:first-of-type{
      >button{
        margin-left:20px;
      }
    }
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