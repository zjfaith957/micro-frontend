<template>
    <section class="main-content">
        <q-splitter
          v-model="splitterModel"
          style="height: 400px"
        >

          <template v-slot:before>
            <div class="q-pa-md">
              <q-tree
                :nodes="simple"
                node-key="label"
                selected-color="primary"
                v-model:selected="selected"
                default-expand-all
              />
            </div>
          </template>
          <!-- //  -->
          <template v-slot:after>
            <q-tab-panels
              v-model="selected"
              animated
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="Food">
                <div class="header-container">
                    <div><q-btn unelevated outline color="primary" size="md" label="导入"/></div>
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
                            <q-td key="no" :props="props">
                                <span>{{ props.row.no }}</span>
                            </q-td>
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
                                <q-icon name="visibility" style="color:#1976D2"/>
                                <q-btn
                                unelevated
                                @click="add()"
                                color="primary"
                                label="详情"
                                flat
                                dense
                                ></q-btn>
                            </q-td>
                        </q-tr>
                        </template>
                    </q-table>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
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
              <div class="col-3 text-right text-subtitle2 q-pr-md">申请标题:</div>
              <q-input
                  outlined
                  dense
                  class="col-7"
                  v-model="searchForm.name"
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
</template>

<script setup>
import { ref,reactive, toRefs} from 'vue'
import { useQuasar } from 'quasar'

const formDialog= ref('formDialog')
const state = reactive({
    splitterModel:18,
    selected: 'Food',
    simple: [
      {
        label: '公共组合',
        children: [
          {
            label: 'Food1',
            icon: 'restaurant_menu'
          },
          {
            label: 'Food',
            icon: 'room_service'
          },
          {
            label: 'Food2',
            icon: 'photo'
          }
        ]
      }
    ],
    columns : [
        {
            name: 'no',
            required: true,
            label: '编号',
            align: 'center',
            field: row => row.name,
            format: val => `${val}`,
        },
        {
            name: 'name',
            required: true,
            label: '申请标题',
            align: 'center',
            field: row => row.name,
            format: val => `${val}`,
        },
        { name: 'calories', align: 'center', label: '时间', field: 'calories', sortable: true },
        { name: 'fat', align: 'center',label: '备注', field: 'fat', sortable: true },
        { name: 'carbs',align: 'center', label: '申请人', field: 'carbs' },
        { name: 'protein',align: 'center', label: '申请机构', field: 'protein' },
        { name: 'sodium', align: 'center',label: '申请时间', field: 'sodium' },
        { name: 'calcium',align: 'center', label: '租户名称', field: 'calcium'},
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
            no:95278,
            name: '流程名称螺',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '启用',
            iron: '1%'
        },
        {
            no:95278,
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
            no:95278,
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
            no:95278,
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
})

const { splitterModel,selected,simple,columns,rows,form,searchForm,addDialog,searchDialog } = toRefs(state)

// 新增
const add = () => {
  addDialog.value = true
}
// 高级查询
const searchEv = () => {
  searchDialog.value = true
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