<template>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onChange="Changedata"
        @onCreated="handleCreated"
      />
    </div>
</template>
<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  components: { Editor, Toolbar },
  //   props: {
  //   content: {
  //     default: '',
  //     type: String,
  //   },
  // },
   props: ['content'],
  setup(props,{emit}) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    console.log(props.content)
    // 内容 HTML
    const valueHtml = props.content

    // 模拟 ajax 异步获取内容
    onMounted(() => {
        setTimeout(() => {
            // valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
        }, 1500)
    })

    const toolbarConfig = {}
    const editorConfig = {
      MENU_CONF:{} ,
      withCredentials:true,//定义该属性为ture表示允许跨域访问
    autofocus:false,
    scroll:true,
    // maxLength:10200,
    minLength:200,
    }
    editorConfig.MENU_CONF['uploadImage'] = {
     server: '/api/laravel10.6.2/public/type/imgUp',
       fieldName:'image',
    // server:'http://192.168.178.44:8888/upImage',//后台服务器地址
      maxFileSize: 6 * 1024 * 1024, //
      maxNumberOfFiles: 200,
    // allowedFileTypes: ['image/*'],
    // timeout: 20 * 1000, // 5 秒

}

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    const Changedata = (editor) => {
      console.log(editor.getHtml())
      emit("changeData",{data:editor.getHtml()})
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      Changedata
    };
  }
}
</script> 