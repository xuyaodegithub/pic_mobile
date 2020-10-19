export const jsApiCall = async (fun,id,that) => {
    const orderMsg = await fun( {package_id: id} );
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        orderMsg.data,
        function (res) {
            // WeixinJSBridge.log( res.err_msg );
            if(res.err_msg == "get_brand_wcpay_request:ok" ){//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                that.$router.replace('/paySuccess')
            }else{
                that.$router.replace('/orderList?type=1')
            }
            // alert( res.err_code + res.err_desc + res.err_msg );
        }
    )
}
