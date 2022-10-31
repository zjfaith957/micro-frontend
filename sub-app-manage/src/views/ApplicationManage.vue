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
                    <q-btn unelevated outline color="primary" label="高级搜索" size="md" @click="onResetClickAction()"/>
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
                        @click="onEditClickAction(props.row.id)"
                        color="primary"
                        label="编辑"
                        flat
                        dense
                        ></q-btn>
                        <q-icon name="visibility" style="color:#1976D2"/>
                        <q-btn
                        unelevated
                        @click="onFormBuilderClickAction(props.row.id)"
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
    <!-- 新增弹框 -->
    <co-dialog
      ref="formDialog"
      title="表单演示"
      no-backdrop-dismiss
      card-style="width:800px; max-width:95vw;"
    >
      <co-form ref="dialogForm" class="q-px-lg q-my-none row q-col-gutter-x-xl q-col-gutter-y-md">
          <co-input class="col-12 col-sm-6" label-slot label="输入框第一个" v-model="dialogForm.calcium" >
            <template v-slot:label>
              <span style="color: var(--q-color-primary)">输入框第一个</span>
            </template>
          </co-input>
          <co-input class="col-12 col-sm-6" label="输入框第二个" v-model="dialogForm.calcium" :rules="[val => !!val || 'Field is required']"/>
          <co-select
            class="col-12 col-sm-6"
            label-slot
            label="选择框第一个"
            use-input
            hide-selected
            fill-input
            v-model="selectModel"
            no-filter
            :options="mapOptions"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            clearable
            emit-value
            map-options
          >
            <template v-slot:label>
              <span style="color: var(--q-color-primary)">输入框第一个</span>
            </template>
          </co-select>
          <co-select
            class="col-12 col-sm-6"
            label="选择框第二个"
            v-model="selectModel"
            no-filter
            :options="mapOptions"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            emit-value
            map-options
          />
          <co-select
            class="col-12 col-sm-6"
            label="选择框第三个"
            label-slot
            v-model="selectModel"
            no-filter
            use-input
            hide-selected
            fill-input
            :options="mapOptions"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            use-chips
            clearable
            emit-value
            map-options
          >
            <template v-slot:label>
              <span style="color: var(--q-color-primary)">Slot 标签</span>
            </template>
          </co-select>
          <co-select
            class="col-12 col-sm-6"
            label="选择框第四个"
            v-model="selectModel"
            no-filter
            :options="mapOptions"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            use-chips
            clearable
            emit-value
            map-options
          />
      </co-form>
      <q-card-actions class="q-pa-md">
        <q-space />
        <co-btn label="取消" flat v-close-popup />
        <co-btn label="保存"  type="submit" color="primary" @click="$refs.dialogForm.submit()"/>
      </q-card-actions>
    </co-dialog>
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
    dialogForm:{

    }
})

const { columns,rows,dialogForm } = toRefs(state)

// 新增
const add = () => {
    formDialog.show()
}
const $q = useQuasar()
const disabledBtn = () => {
    $q.dialog({
        title: '提示',
        message: '禁用该列表数据，是否继续?',
        ok: {
          push: true
        },
        cancel: {
          push: true,
        },
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
}
</script>

<style lang="scss" scoped>
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