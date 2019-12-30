<template>
  <div>
    <!--搜索和增加-->
    <div>
      <el-form :inline="true" :model="form">
        <!--根据姓名搜索-->
        <el-form-item>
          <el-input
            placeholder="请输入姓名"
            v-model="form.name"
            @keyup.enter.native="handleFind(form)"
          />
        </el-form-item>

        <!--根据性别搜索-->
        <el-form-item>
          <el-select v-model="form.gender" placeholder="请选择性别" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!--根据创建日期搜索-->
        <el-form-item>
          <el-date-picker
            v-model="form.createDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择创建日期时间"
          >
          </el-date-picker>
        </el-form-item>

        <!--重置按钮-->
        <el-button type="info" @click="handleReset()">
          重置
        </el-button>

        <!--搜索按钮-->
        <el-button type="primary" @click="handleFind(form)">
          搜索
        </el-button>

        <!--增加按钮-->
        <el-button
          type="success"
          @click="saveButton()"
          style="margin-left: 5em"
        >
          增加
        </el-button>
      </el-form>

      <!--弹窗，弹窗是增加和编辑功能复用-->
      <div>
        <el-dialog
          :title="dialogTitle"
          :visible.sync="dialogFormVisible"
          width="25em"
        >
          <el-form :model="form" :rules="rules" ref="form" label-width="5em">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="性别">
              <el-radio v-model="form.gender" label="0">女</el-radio>
              <el-radio v-model="form.gender" label="1">男</el-radio>
              <el-radio v-model="form.gender" label="2">其他</el-radio>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" autocomplete="off" />
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="form.age" autocomplete="off" />
            </el-form-item>
            <el-form-item
              label="创建时间"
              :style="{ display: form.id === '' ? 'none' : 'inline' }"
            >
              <el-input
                v-model="form.createDate"
                autocomplete="off"
                :disabled="true"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <!--弹窗取消按钮-->
            <el-button @click="handleCancel()">取 消</el-button>
            <!--弹窗确定按钮-->
            <el-button type="primary" @click="handleSaveOrUpdate('form')">
              确 定
            </el-button>
          </div>
        </el-dialog>
      </div>
    </div>

    <!--表格展示-->
    <div style="margin-left: 5em; margin-right: 5em">
      <el-table :data="getUser" align="center" style="width: 100%">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="gender" label="性别" width="180">
          <template slot-scope="scope">
            <el-tag
              :style="{
                display: scope.row.gender === '' ? 'none' : 'inline-block'
              }"
              :type="
                scope.row.gender === '0'
                  ? 'success'
                  : scope.row.gender === '1'
                  ? 'primary'
                  : 'warning'
              "
              disable-transitions
            >
              {{
                scope.row.gender === "0"
                  ? "女"
                  : scope.row.gender === "1"
                  ? "男"
                  : "其他"
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="age" label="年龄" width="180" />
        <el-table-column prop="createDate" label="创建时间" width="180" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--编辑按钮-->
            <el-button size="mini" @click="editButton(scope.$index, scope.row)">
              编辑
            </el-button>

            <!--删除按钮-->
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",

  data() {
    return {
      //弹窗开关标志
      dialogFormVisible: false,

      //弹窗标题
      dialogTitle: "",

      //性别选项
      options: [
        {
          value: "0",
          label: "女"
        },
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "其他"
        }
      ],
      gender: "",

      //表单值
      form: {
        id: "",
        name: "",
        gender: "",
        email: "",
        age: "",
        createDate: ""
      },

      //表单检验规则
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        age: [
          {
            required: true,
            type: "number",
            message: "请输入数字类型",
            trigger: "blur"
          },
          {
            pattern: /^\d{1,3}$/,
            message: "年龄范围为：0-999",
            trigger: "blur"
          }
        ]
      }
    };
  },

  //请求getUser接口
  mounted() {
    this.$store.dispatch("getUser", { form: "" });
  },

  computed: {
    getUser() {
      return this.$store.state.UserModule.user;
    }
  },

  methods: {
    //重置逻辑
    handleReset() {
      this.form = {
        name: "",
        gender: "",
        createDate: ""
      };

      this.handleFind("");
    },

    //搜索逻辑
    handleFind(form) {
      this.$store.dispatch("getUser", { form });
    },

    //删除逻辑
    handleDelete(id) {
      this.$store.dispatch("deleteUser", { id });
    },

    //增加和编辑逻辑（弹窗确定）
    handleSaveOrUpdate(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          form = this.$refs[form].model;
          this.$store.dispatch("saveOrUpdateUser", { form });
          this.dialogFormVisible = false;

          this.form = {
            id: "",
            name: "",
            gender: "",
            email: "",
            age: "",
            createDate: ""
          };
        } else {
          return false;
        }
      });
    },

    //取消按钮逻辑（弹窗取消）
    handleCancel() {
      this.dialogFormVisible = false;
    },

    //增加按钮逻辑
    saveButton() {
      this.dialogFormVisible = true;
      this.dialogTitle = "新增用户";
      this.form = {
        id: "",
        name: "",
        gender: "",
        email: "",
        age: "",
        createDate: ""
      };
    },

    //编辑按钮逻辑
    editButton(index, row) {
      this.dialogFormVisible = true;
      this.dialogTitle = "编辑用户";
      // 获取table属性值
      this.form = Object.assign({}, row);
    }
  }
};
</script>
