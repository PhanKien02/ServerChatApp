export const mailActive = (name,key)=>{
    let content =`
        <h2>Hello [${name}]</h2> 
        <p>Thank you for joining [customer portal].</p>
        <p>We’d like to confirm that your account was created successfully. To access chat App use key active : </p>
        <h1 style="text-align: center;">${key}</h1>
        <p>If you experience any issues logging into your account, reach out to us at [email address].</p>
        <p>Best,</p>
        <p>The chat App team</p>
        `
    return content
}
export const mailResetPassword = (name,key)=>{
    let content =`
            <h2>Hello [${name}]</h2> 
            <p>Thank you for joining my chatApp.</p>
            <p>We’d like to confirm that your account was created successfully. To access chat App use key active :</p>
            <h1 style="text-align: center;">${key}</h1>
            <p>If you experience any issues logging into your account, reach out to us at <a href="kien1st02@gmail.com">kien1st02@gmail.com</a>.</p>
            <p>Best,</p>
            <p>The chat App team</p>
        `
    return content
}




